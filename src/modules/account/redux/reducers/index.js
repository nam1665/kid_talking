import * as actionTypes from '../actionTypes';
const initState = {
    isAuthenticated: false,
    userState: 0,
    trialCourse: null,
    roles: [],
    userInfo: {
        fullName: 'Harry Duong'
    },
    unitInfo: {},
    course_lession: []
};
export default (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ACCOUNT_REQUEST_ME_SUCCESS:
            return { ...state, isAuthenticated: true, userInfo: action.payload };

        case actionTypes.ACCOUNT_REQUEST_USER_STATUS_SUCCESS:
        case actionTypes.ACCOUNT_UPDATE_USER_STATUS:
            return { ...state, userState: action.payload };
        case actionTypes.ACCOUNT_REQUEST_COURSE_LESSION_EXTERNAL_SUCCESS:
            return { ...state, course_lession: action.payload };
                
        case actionTypes.ACCOUNT_LOGIN_SUCCESS:
            return { ...state };

        case actionTypes.ACCOUNT_REQUEST_TRIAL_COURSE_SUCCESS:
            return { ...state, trialCourse: action.payload };

        default:
            return state;
    }
};
