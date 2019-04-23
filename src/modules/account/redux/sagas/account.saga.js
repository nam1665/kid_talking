import * as actionTypes from '../actionTypes';
import Request from 'src/helpers/Request';
import Storage from 'src/helpers/Storage';
import { put, take, call } from 'redux-saga/effects';
import { LOGIN_URL } from 'src/helpers/constants';
import qs from 'query-string';

function* authorize(credentials = {}, meta = {}) {
    const { resolve, reject } = meta;
    const { isRemember, ...data } = credentials;
    try {
        const res = yield Request.request({
            method: 'POST',
            baseURL: LOGIN_URL,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({
                service: 'moodle_mobile_app',
                ...data
            }),
            transformResponse: [].concat(Request.defaultTranform, Request.transformResponse)
        });

        yield Request.setToken(res.result.token, isRemember);

        const lastUnitInfo =
            res.result.unit_info && res.result.unit_info.length > 0
                ? res.result.unit_info[res.result.unit_info.length - 1]
                : false;

        yield Storage.set('kidUserId', res.result.userinfo.id);
        yield Storage.set('kidVcrxId', res.result.idVcrx);
        if (lastUnitInfo) {
            yield Storage.set('kidLevel', lastUnitInfo.level);
            yield Storage.set('kidUnit', lastUnitInfo.fullname);
            yield Storage.set('kidCourceId', lastUnitInfo.id);
        }
        // localStorage.setItem('userInfo', JSON.stringify(res.result));
        yield put({
            type: actionTypes.ACCOUNT_LOGIN_SUCCESS,
            payload: res
        });
        yield call(watchGetMe, res.result.token);
        yield call(watchGetStatus, res.result.token);
        yield call(watchGetTrialCourses);
        yield call(resolve, res);
        return res;
    } catch (err) {
        yield call(reject, err);
        yield put({
            type: actionTypes.ACCOUNT_LOGIN_FAIL,
            payload: err
        });
    }
}

export function* watchSignout() {
    try {
        // const data = yield call(refreshToken);
        yield Request.clearToken();
        yield Storage.remove('kidLevel');
        yield Storage.remove('kidUnit');
        yield Storage.remove('kidCourseId');
        yield put({
            type: actionTypes.ACCOUNT_LOGOUT_SUCCESS
        });
    } catch (err) {
        yield put({
            type: actionTypes.ACCOUNT_LOGOUT_FAIL
        });
    }
}

export function* authFlowSaga() {
    while (true) {
        const { credentials, meta } = yield take(actionTypes.ACCOUNT_LOGIN);

        yield call(authorize, credentials, meta);
    }
}

export function* watchGetMe(token) {
    if (Storage.getAccessToken() || token) {
        try {
            const data = yield Request.request({
                method: 'get',
                params: {
                    wsfunction: 'local_profile_view',
                    id: Storage.get('kidUserId')
                },
                transformResponse: [].concat(Request.defaultTranform, Request.transformResponse)
            });

            yield put({
                type: actionTypes.ACCOUNT_REQUEST_ME_SUCCESS,
                payload: data.user
            });

            return data;
        } catch (err) {
            yield put({
                type: actionTypes.ACCOUNT_REQUEST_ME_FAIL,
                payload: err
            });
        }
    }
}

export function* watchGetStatus(token) {
    if (Storage.getAccessToken() || token) {
        try {
            const data = yield Request.get('', {
                wsfunction: 'local_get_user_status',
                userid: Storage.get('kidUserId')
            });

            yield put({
                type: actionTypes.ACCOUNT_REQUEST_USER_STATUS_SUCCESS,
                payload: data.state
            });
        } catch (e) {
            yield put({
                type: actionTypes.ACCOUNT_REQUEST_USER_STATUS_FAIL,
                payload: e
            });
        }
    }
}

export function* watchGetTrialCourses() {
    if (Storage.getAccessToken()) {
        try {
            const data = yield Request.get('', {
                wsfunction: 'local_get_current_trial_course',
                userId: Storage.get('kidUserId')
            });

            yield put({
                type: actionTypes.ACCOUNT_REQUEST_TRIAL_COURSE_SUCCESS,
                payload: data.result ? data.result[0] : null
            });
        } catch (e) {
            yield put({
                type: actionTypes.ACCOUNT_REQUEST_TRIAL_COURSE_FAIL,
                payload: e
            });
        }
    }
}
