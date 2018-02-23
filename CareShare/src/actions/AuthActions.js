import firebase from 'firebase';
import store from 'react-native-simple-store';

import {
    USER_CREATE_FAIL,
    USER_CREATE_SUCCESS,
    USER_GET_SUCESS,
    USER_GET_FAIL,
    STORE_PROFILE_KEY,
} from '../actions/types';

export const loginCreateAccount = ({ email, password, company }) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                const profileUid = user.uid;
                console.log('- Auth user found with ID: ', profileUid);
                getProfile(profileUid, dispatch);
            })
            .catch((error) => {
                console.log('- Login error: ', error);
                if (error.code === 'auth/user-not-found') {
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then((newUser) => {
                            const profileUid = newUser.uid;
                            console.log('- Creating auth user found with ID: ', profileUid);
                            createProfil(profileUid, email, company, dispatch);
                        })
                        .catch((createError) => {
                            console.log('error:', createError);
                            dispatch({ type: USER_CREATE_FAIL });
                        });
                } else {
                    console.log(error);
                    dispatch({ type: USER_GET_FAIL });
                }
            });
    };
};

const getProfile = (profileUid, dispatch) => {
    firebase.database().ref(`/profiles/${profileUid}`)
        .once('value', (snapshot) => {
            const profile = { ...snapshot.val(), uid: profileUid };
            if (profile) {
                // save profile local
                saveProfile(profile);

                dispatch({
                    payload: profile,
                    type: USER_GET_SUCESS
                });
            }
        });
};

const createProfil = (profileId, email, company, dispatch) => {
    //extract name from email
    const index = email.indexOf('@');
    const name = email.substring(0, index);

    const ref = firebase.database().ref(`/profiles/${profileId}`);
    const profileObject = {
        uid: profileId,
        name,
        icon: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        carPoints: 0,
        creadtionDate: new Date().toDateString(),
        verified: false,
        company: {
            companyUid: company.uid,
            companyDomain: company.companyDomain,
            companyLongitude: company.longitude,
            companyLatitude: company.latitude,
        }
    };

    console.log('- Writing user in /profile/userId userObject: ', profileObject);
    ref.set(profileObject)
        .then(() => {
            // save profile local
            saveProfile(profileObject);

            // send confirmation email
            const user = firebase.auth().currentUser;

            user.updateProfile({
                displayName: name,
            }).then(() => {
                // Update successful.
                user.sendEmailVerification().then(() => {
                    // Email sent.
                }).catch((emailError) => {
                    // An error happened.
                    console.log('Email sending error: ', emailError);
                });
            }).catch((profileUpdateError) => {
                // An error happened.
                console.log('Profile update error: ', profileUpdateError);
            });

            dispatch({
                payload: profileObject,
                type: USER_CREATE_SUCCESS
            });
        })
        .catch((error) => {
            console.log('error:', error);
            dispatch({ type: USER_CREATE_FAIL });
        });
};

const saveProfile = (profile) => {
    // save profile to phone
    store.save(STORE_PROFILE_KEY, profile);
};

export const loadProfile = () => {
    return (dispatch) => {
        // loade profile from phone
        store.get(STORE_PROFILE_KEY)
            .then((profile) => {
                if (profile) {
                    console.log('- Loaded profile from phone: ', profile);

                    dispatch({
                        payload: profile,
                        type: USER_GET_SUCESS,
                    });
                } else {
                    console.log('- Loaded profile - none found.');
                    dispatch({
                        type: USER_GET_FAIL
                    });
                }
            })
            .catch((error) => {
                console.log('error:', error);
                dispatch({
                    type: USER_GET_FAIL
                });
            });
    };
};

export const checkIfAccountVerified = () => {
    return (dispatch) => {
        store.get(STORE_PROFILE_KEY)
            .then((profile) => {
                if (profile) {
                    const user = firebase.auth().currentUser;

                    user.reload()
                        .then(() => {
                            if (user.emailVerified === true) {
                                // save new profile
                                saveProfile({ ...profile, verified: true });

                                // change profile count -1
                                const companyRef = firebase.database().ref(`/companies/${profile.company.companyUid}`);

                                companyRef.once('value', (snapshot) => {
                                    companyRef.update({
                                         licencesCount: snapshot.val().licencesCount - 1
                                    });
                                });

                                // change profile verified flag to true
                                firebase.database().ref(`/profiles/${profile.uid}`)
                                .update({
                                    verified: true
                                });

                                dispatch({
                                    payload: { ...profile, verified: true },
                                    type: USER_CREATE_SUCCESS
                                });
                            } 
                        }).catch((error) => {
                            console.log('- Error profile refresh: ', error);
                        });
                } else {
                    dispatch({
                        type: USER_GET_FAIL
                    });
                }
            })
            .catch((error) => {
                console.log('error:', error);
                dispatch({
                    type: USER_GET_FAIL
                });
            });
    };
};
