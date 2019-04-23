import * as actionTypes from '../actionTypes';
import Storage from 'src/helpers/Storage';
export const setLocale = locale => {
    Storage.set('locale', locale);
    return {
        type: actionTypes.LANGUAGE_SET_LOCALE,
        payload: locale
    };
};
