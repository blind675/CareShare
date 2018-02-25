import {
    OFFER_CREATE_FAIL,
    OFFER_CREATE_SUCCESS,
    OFFER_GET_SUCESS,
    OFFER_GET_FAIL,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OFFER_CREATE_SUCCESS:
            return action.payload;
        case OFFER_GET_SUCESS:
            return action.payload;
        case OFFER_CREATE_FAIL:
            return {};
        case OFFER_GET_FAIL:
            return {};
        default:
            return state;
    }
};
