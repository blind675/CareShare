import { combineReducers } from 'redux';
import CompaniesReducer from './CompaniesReducer';
import AuthReducer from './AuthReducer';
import LocationsReducer from './LocationsReducer';
import OfferReducer from './OfferReducer';
import RidesReducer from './RidesReducer';

export default combineReducers({
    companies: CompaniesReducer,
    profile: AuthReducer,
    homeLocation: LocationsReducer,
    ride: OfferReducer,
    rides: RidesReducer,
});
