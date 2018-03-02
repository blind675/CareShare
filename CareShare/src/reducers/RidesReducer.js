import {
    RIDES_GET_SUCCESS,
    RIDES_GET_FAIL,
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RIDES_GET_SUCCESS:
            return action.payload;
        case RIDES_GET_FAIL:
            return [];
        default:
            return state;
    }
};
