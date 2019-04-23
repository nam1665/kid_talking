import * as actionTypes from './../actionTypes';

export const refreshToken = () => ({
    type: actionTypes.ACCOUNT_REFRESH_TOKEN
});

export const logout = () => ({
    type: actionTypes.ACCOUNT_LOGOUT
});

export const login = (data, meta) => ({
    type: actionTypes.ACCOUNT_LOGIN,
    credentials: data,
    meta
});

export const updateUserStatus = status => ({
    type: actionTypes.ACCOUNT_UPDATE_USER_STATUS,
    payload: status
});

// export const ACTION_KEY = 'authActions';
