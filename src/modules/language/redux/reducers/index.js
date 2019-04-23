import * as actionTypes from '../actionTypes';
import Storage from 'src/helpers/Storage';
import localeData from 'src/locales';
const initState = {
    locale: Storage.get('locale', 'en'),
    data: localeData
};
export default (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LANGUAGE_SET_LOCALE:
            return { ...state, locale: action.payload };
        default:
            return state;
    }
};

export const STATE_KEY = 'language';
