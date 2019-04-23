import url from 'url';
import _ from 'lodash';
import moment from 'moment';
import pathToRegexp from 'path-to-regexp';

export const generateImageUrl = (link = '') => {
    if (_.isString(link)) return url.resolve('', link);
    return '';
};

export const getIdYoutube = (url = '') => {
    const code = url.match(/v=([^&#]{5,})/);
    if (code) {
        return typeof code[1] === 'string' ? code[1] : '';
    }
};

export const bytesToSize = bytes => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (!bytes) return 'N/A';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 0);
    if (i === 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

export const makePath = (path = '') => {
    return pathToRegexp.compile(path);
};

export const urlToList = (url = '') => {
    const urllist = url.split('/').filter(i => i);
    return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
};

export const fixedZero = val => {
    return val * 1 < 10 ? `0${val}` : val;
};
export const getTimeDistance = type => {
    const now = new Date();
    const oneDay = 1000 * 60 * 60 * 24;

    if (type === 'today') {
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        return [moment(now), moment(now.getTime() + (oneDay - 1000))];
    }

    if (type === 'week') {
        let day = now.getDay();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);

        if (day === 0) {
            day = 6;
        } else {
            day -= 1;
        }

        const beginTime = now.getTime() - day * oneDay;

        return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
    }

    if (type === 'month') {
        const year = now.getFullYear();
        const month = now.getMonth();
        const nextDate = moment(now).add(1, 'months');
        const nextYear = nextDate.year();
        const nextMonth = nextDate.month();

        return [
            moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
            moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)
        ];
    }

    const year = now.getFullYear();
    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
};

export const isAuthenticated = (auth = {}) => auth.isAuthenticated;

export const bindActionToPromise = (dispatch, actionCreator) => (...payload) => {
    return new Promise((resolve, reject) => dispatch(actionCreator(...payload, { resolve, reject })));
};
