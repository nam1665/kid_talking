/* eslint no-console: 0 */
import axios, { CancelToken } from 'axios';
import _ from 'lodash';
import { ACCOUNT_LOGOUT } from 'src/modules/account/redux/actionTypes';
import { API_URL, API_TIMEOUT } from './constants';
import history from 'src/core/init/history';
import qs from 'query-string';
import Storage from './Storage';
import Route from './Route';

let onRefreshToken = undefined;

const headers = {
    'Content-Type': 'application/json',
    'Content-Language': Storage.get('locale', 'en')
};

const token = Storage.getAccessToken();
const defaultParams = { moodlewsrestformat: 'json' };
if (token) {
    Object.assign(defaultParams, {
        wstoken: token
    });
    // Object.assign(headers, {
    // 	Authorization: `Bearer ${token}`
    // });
}

function transformResponse(data) {
    if (data) {
        if (data.hasOwnProperty('success') && data.success) {
            return data;
        } else if (data.hasOwnProperty('status') && data.status) {
            return data;
        } else if (data.hasOwnProperty('message') && data.message === 'success') {
            return data;
        } else {
            const err = { code: 400, data };
            throw err;
        }
    } else {
        const err = { code: 400, data: { message: 'BadRequest' } };
        throw err;
    }
}

const client = axios.create({
    baseURL: API_URL,
    timeout: API_TIMEOUT,
    headers,
    params: defaultParams,
    responseType: 'json',
    // transformResponse: [].concat(axios.defaults.transformResponse, transformResponse),
    validateStatus: status => {
        if (status === 403) {
            history.push(Route.page403);
        } else {
            return status >= 200 && status < 300; // default
        }
    }
});

client.interceptors.request.use(
    config => {
        // Do something before request is sent
        if (config.ignoreAuth) {
            config.validateStatus = status => {
                return status >= 200 && status < 300; // default
            };
        }
        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    }
);

function setupInterceptors(store) {
    client.interceptors.response.use(
        response => {
            return response.data;
        },
        async error => {
            if (error.response) {
                const originalRequest = error.config;
                const errorType = _.get(error.response, 'data.error', '');
                if (errorType === 'invalid_token') {
                    if (!onRefreshToken) {
                        onRefreshToken = client.post('/auth/refresh-token');

                        return onRefreshToken.then(res => {
                            setToken(_.get(res, 'access_token', ''));
                            onRefreshToken = undefined;
                            originalRequest.headers.Authorization = `Bearer ${res.token}`;
                            return client.request(originalRequest);
                        });
                    } else {
                        return onRefreshToken.then(res => {
                            originalRequest.headers.Authorization = `Bearer ${res.token}`;
                            return client.request(originalRequest);
                        });
                    }
                } else if (['refresh_token_not_found', 'invalid_grant'].includes(errorType)) {
                    clearToken();
                    clearRefreshToken();
                    store.dispatch({
                        type: ACCOUNT_LOGOUT
                    });
                } else {
                    throw error.response;
                }
            } else if (error.request) {
                throw {
                    data: { message: 'network.error' }
                };
                // throw error.request;
            } else {
                throw error;
            }
        }
    );
}

export function request(config = {}) {
    return client.request(config);
}

export function get(url, params = {}, config = {}) {
    Object.assign(config, {
        params
    });
    return client.get(url, { params, ...config });
}

export function post(url, data = {}, config = {}) {
    return client.post(url, data, config);
}

export function postEndcode(url, data = {}, config = {}) {
    return client.post(url, qs.stringify(data), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        ...config
    });
}

export function put(url, data = {}, config = {}) {
    return client.put(url, data, config);
}

export function path(url, data = {}, config = {}) {
    return client.patch(url, data, config);
}

export function remove(url, params = {}, config = {}) {
    Object.assign(config, {
        params
    });
    return client.delete(url, { params, ...config });
}

export function upload(url, file, config = {}) {
    config = _.omit(config, ['Content-Type']);
    const data = new FormData();
    data.append('file', file);
    return client.post(url, data, { timeout: 300000, ...config });
}

export function download(url, params = {}, config = {}) {
    return client.get(url, { params, responseType: 'blob', ...config });
}

export function setToken(token = '', isRemember) {
    const date = new Date();

    if (isRemember) {
        date.setDate(date.getDate() + 2);
    } else {
        date.setDate(date.getDate() + 14);
    }

    Storage.setAccessToken(token, {
        expires: date
    });
    client.defaults.params = { ...client.defaults.params, wstoken: token };
    // client.defaults.headers.common.Authorization = `Bearer ${token}`;
    // client.defaults.headers.Authorization = `Bearer ${token}`;
}

export function clearToken() {
    Storage.removeAccessToken();
    delete client.defaults.headers.common.Authorization;
    delete client.defaults.headers.Authorization;
}

export function setRefreshToken(token = '') {
    Storage.setRefreshToken(token);
}

export function clearRefreshToken() {
    Storage.removeRefreshToken();
}

export function cancelToken() {
    return CancelToken.source();
}

export default {
    transformResponse,
    setToken,
    clearToken,
    setRefreshToken,
    clearRefreshToken,
    client,
    request,
    get,
    put,
    post,
    postEndcode,
    path,
    upload,
    download,
    cancelToken,
    delete: remove,
    setupInterceptors,
    defaultTranform: axios.defaults.transformResponse
};
