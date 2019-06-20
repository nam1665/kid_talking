import * as actionTypes from '../actionTypes';
import { delay } from 'redux-saga';
import { call, put, all } from 'redux-saga/effects';
import { watchGetMe, watchGetStatus, watchGetTrialCourses, watchGetCourse } from 'src/modules/account/redux/sagas/account.saga';

function* waiting() {
    yield call(delay, 1000);
}

export function* watchInit() {
    try {
        yield all([waiting(), watchGetMe(), watchGetCourse(), watchGetStatus(), watchGetTrialCourses()]);
    } catch (err) {
        //
    }

    yield put({
        type: actionTypes.COMMON_INIT_SUCCESS
    });
}
