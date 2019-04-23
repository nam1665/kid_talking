import { combineReducers } from 'redux';
import _ from 'lodash';
import { ACCOUNT_LOGOUT_SUCCESS } from 'src/modules/account/redux/actionTypes';
import accountReducer from 'src/modules/account/redux/reducers';
import * as accountConstants from 'src/modules/account/constants';
import commonReducer from 'src/modules/common/redux/reducers';
import * as commonConstants from 'src/modules/common/constants';
import languageReducer from 'src/modules/language/redux/reducers';
import * as languageConstants from 'src/modules/language/constants';

const appReducer = combineReducers({
    [accountConstants.NAME]: accountReducer,
    [commonConstants.NAME]: commonReducer,
    [languageConstants.NAME]: languageReducer
});

export default (state, action) => {
    if (action.type === ACCOUNT_LOGOUT_SUCCESS) {
        state = _.pick(state, [commonConstants.NAME, languageConstants.NAME]);
    }

    return appReducer(state, action);
};
