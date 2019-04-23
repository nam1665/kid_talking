import * as constants from './../constants';
export const stateSelector = state => state[constants.NAME];
export const userSelector = state => state[constants.NAME].userInfo;
