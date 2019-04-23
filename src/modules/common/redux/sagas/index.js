import { takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { watchInit } from './common.saga';

export default [takeLatest(actionTypes.COMMON_INIT, watchInit)];
