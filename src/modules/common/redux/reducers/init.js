import * as actionTypes from '../actionTypes';
const initState = {
    initSuccess: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case actionTypes.COMMON_INIT_SUCCESS:
            return { ...state, initSuccess: true };
        default:
            return state;
    }
};
