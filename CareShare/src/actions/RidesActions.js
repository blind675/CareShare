import firebase from 'firebase';
import _ from 'lodash';

import {
    RIDES_GET_SUCCESS,
    RIDES_GET_FAIL,
} from '../actions/types';

export const getRides = () => {
    return (dispatch, getState) => {
        const { profile, homeLocation } = getState();
        const direction = 'work-home';

        const latitudeDelta = 0.008983; // 1km in latitude
        const longitudeDelta = 1 * (360 / (Math.cos(homeLocation.latitude) * 40075)); // 1km in longitude at current latitude

        console.log('latitudeDelta: ', latitudeDelta, 'longitudeDelta: ', longitudeDelta);

        const acceptableRides = [];

        firebase.database()
            .ref(`/offers/${profile.company.companyDomain}/${direction}`)
            .orderByChild('carPlaces')
            .startAt(1)
            .once('value', (snapshot) => {
                const ridesList = _.map(snapshot.val(), (val, uid) => {
                    return { ...val, uid };
                });
                console.log(' Get Rides list: ', ridesList);

                ridesList.forEach((offer) => {
                    if (homeLocation.latitude <= (offer.location.latitude + latitudeDelta) &&
                        homeLocation.latitude >= (offer.location.latitude - latitudeDelta) &&
                        homeLocation.longitude <= (offer.location.longitude + longitudeDelta) &&
                        homeLocation.longitude >= (offer.location.longitude - longitudeDelta)) {
                            acceptableRides.push(offer);
                    }
                });
                console.log(' Acceptable Rides list: ', acceptableRides);
                
                dispatch({
                    payload: acceptableRides,
                    type: RIDES_GET_SUCCESS
                });
            })
            .catch((error) => {
                console.log(' Get Rides error: ', error);

                dispatch({
                    type: RIDES_GET_FAIL
                });
            });
    };
};
