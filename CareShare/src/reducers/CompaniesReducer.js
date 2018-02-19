import {
    COMPANIES_LIST_GET_FAIL,
    COMPANIES_LIST_GET_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COMPANIES_LIST_GET_SUCCESS:
            return action.payload;
        case COMPANIES_LIST_GET_FAIL:
            return INITIAL_STATE;
        default:
            return state;
    }
};
