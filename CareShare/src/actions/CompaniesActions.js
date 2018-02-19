import firebase from 'firebase';
import _ from 'lodash';

import {
    COMPANIES_LIST_GET_SUCCESS,
} from '../actions/types';

export const getCompanies = () => {
    return (dispatch) => {
        firebase.database()
            .ref('/companies')
            .once('value', (snapshot) => {
                const companies = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid };
                });
                dispatch({
                    type: COMPANIES_LIST_GET_SUCCESS,
                    payload: companies
                });
            });
    };
};
