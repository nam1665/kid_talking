import { takeEvery, fork } from 'redux-saga/effects';
import { ACCOUNT_REQUEST_ME, ACCOUNT_LOGOUT } from './../actionTypes';
import { authFlowSaga, watchGetMe, watchSignout } from './account.saga';

export default [takeEvery(ACCOUNT_REQUEST_ME, watchGetMe), takeEvery(ACCOUNT_LOGOUT, watchSignout), fork(authFlowSaga)];
