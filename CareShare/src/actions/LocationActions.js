import store from 'react-native-simple-store';

import {
    LOCATION_HOME_SAVE_FAIL,
    LOCATION_HOME_SAVE_SUCCESS,
    LOCATION_HOME_LOAD_FAIL,
    LOCATION_HOME_LOAD_SUCCESS,
    STORE_HOME_KEY,
} from '../actions/types';

export const saveHomeLocation = (position) => {
    return (dispatch) => {
        console.log(' - Save Home Location: ', position);
        store.save(STORE_HOME_KEY, position)
        .then(() => {
            dispatch({
                payload: position,
                type: LOCATION_HOME_SAVE_SUCCESS
            });
        })
        .catch((error) => {
            console.log(' - Save Home Location Error: ', error);
            dispatch({
                type: LOCATION_HOME_SAVE_FAIL
            });
        });
    };
};

export const loadHomeLocation = () => {
    return (dispatch) => {
        store.get(STORE_HOME_KEY)
        .then((position) => {
            console.log(' - Load Home Location: ', position);
            dispatch({
                payload: position,
                type: LOCATION_HOME_LOAD_SUCCESS
            });
        })
        .catch((error) => {
            console.log('error:', error);
            dispatch({
                type: LOCATION_HOME_LOAD_FAIL
            });
        });
    };
};
