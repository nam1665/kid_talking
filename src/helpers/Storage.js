import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './constants';

class Storage {
    static getAccessToken() {
        return Storage.get(ACCESS_TOKEN_KEY);
    }

    static setAccessToken(token, option) {
        Storage.set(ACCESS_TOKEN_KEY, token, option);
    }

    static removeAccessToken(option) {
        Storage.remove(ACCESS_TOKEN_KEY, option);
    }

    static getRefreshToken() {
        return Storage.get(REFRESH_TOKEN_KEY);
    }

    static setRefreshToken(token, option) {
        Storage.set(REFRESH_TOKEN_KEY, token, option);
    }

    static removeRefreshToken(option) {
        Storage.remove(REFRESH_TOKEN_KEY, option);
    }

    static get(key, defaultValue, option = {}) {
        return Cookies.get(key, { path: '/', ...option }) || defaultValue;
    }

    static set(key, value, option = {}) {
        Cookies.set(key, value, { path: '/', ...option });
    }

    static remove(key, option = {}) {
        Cookies.remove(key, { path: '/', ...option });
    }
}

export default Storage;
