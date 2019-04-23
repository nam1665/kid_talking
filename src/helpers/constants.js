window.env = window.env || {};

const { REACT_APP_BASE_URL: BASE_URL, REACT_APP_API_TIMEOUT = 60000 } = process.env;
const { REACT_APP_ACCESS_TOKEN_KEY = 'kidAccessToken', REACT_APP_REFRESH_TOKEN_KEY = 'kidReefreshToken' } = process.env;
const { REACT_APP_BASE_URL = BASE_URL } = window.env;

export const API_URL = `${REACT_APP_BASE_URL}/webservice/rest/server.php`;
export const LOGIN_URL = `${REACT_APP_BASE_URL}/local/auth_config/kid_login.php`;
export const API_TIMEOUT = REACT_APP_API_TIMEOUT;
export const ACCESS_TOKEN_KEY = REACT_APP_ACCESS_TOKEN_KEY;
export const REFRESH_TOKEN_KEY = REACT_APP_REFRESH_TOKEN_KEY;

const data = {
    API_URL,
    ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY,
    API_TIMEOUT: REACT_APP_API_TIMEOUT
};

export default data;
