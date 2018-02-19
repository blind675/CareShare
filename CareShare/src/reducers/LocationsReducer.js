import {
    LOCATION_HOME_SAVE_FAIL,
    LOCATION_HOME_SAVE_SUCCESS,
    LOCATION_HOME_LOAD_FAIL,
    LOCATION_HOME_LOAD_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOCATION_HOME_SAVE_SUCCESS:
            return action.payload;
        case LOCATION_HOME_LOAD_SUCCESS:
            return action.payload;
        case LOCATION_HOME_LOAD_FAIL:
            return INITIAL_STATE;
        case LOCATION_HOME_SAVE_FAIL:
            return null;
        default:
            return state;
    }
};
