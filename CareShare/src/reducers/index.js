import { combineReducers } from 'redux';
import CompaniesReducer from './CompaniesReducer';
import AuthReducer from './AuthReducer';
import LocationsReducer from './LocationsReducer.js';

export default combineReducers({
    companies: CompaniesReducer,
    profile: AuthReducer,
    homeLocation: LocationsReducer,
});
