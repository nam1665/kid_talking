class Route {
    static page403 = `/403`;
    static page404 = `/404`;
    static page500 = `/500`;
    static home = '/';
    static login = '/login';
    static survey = '/survey';
    static test = '/test';
    static getHomework = (unitid, lessonid) => `/homework?unit=${unitid}&lesson=${lessonid}`;
    static homework = '/homework';
}

export default Route;
