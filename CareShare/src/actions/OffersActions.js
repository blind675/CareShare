import firebase from 'firebase';
import store from 'react-native-simple-store';

import {
    OFFER_CREATE_FAIL,
    OFFER_CREATE_SUCCESS,
    OFFER_GET_SUCESS,
    OFFER_GET_FAIL,
    STORE_RIDE_KEY,
} from '../actions/types';

export const offerRide = ({ direction, carPlaces, departureTime }) => {
    return (dispatch, getState) => {
        const { profile, homeLocation } = getState();

        console.log('direction: ', direction);
        const offerObject =
            {
                carPlaces,
                departureTime,
                location: homeLocation,
                driver: {
                    profileUid: profile.uid,
                    profileName: profile.name,
                    profileIcon: profile.icon
                },
                passengers: [],
            };

        firebase.database().ref(`/offers/${profile.company.companyDomain}/${direction}`)
            .push(offerObject)
            .then(() => {
                saveRide(offerObject);

                console.log('Saved Offer Object: ', offerObject);
                
                dispatch({
                    payload: offerObject,
                    type: OFFER_CREATE_SUCCESS
                });
            })
            .catch((error) => {
                console.log('Offer create error: ', error);
                dispatch({ type: OFFER_CREATE_FAIL });
            });
    };
};

const saveRide = (offerObject) => {
    // save offer to phone
    store.save(STORE_RIDE_KEY, offerObject);
};

export const loadRide = () => {
    return (dispatch) => {
        // loade ride from phone
        store.get(STORE_RIDE_KEY)
            .then((ride) => {
                if (ride) {
                    console.log(' - Loaded ride from phone: ', ride);

                    dispatch({
                        payload: ride,
                        type: OFFER_GET_SUCESS,
                    });
                } else {
                    console.log(' - Loaded ride - none found.');
                    dispatch({
                        type: OFFER_GET_FAIL
                    });
                }
            })
            .catch((error) => {
                console.log('error:', error);
                dispatch({
                    type: OFFER_GET_FAIL
                });
            });
    };
};
