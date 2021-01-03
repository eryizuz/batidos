import { combineReducers } from 'redux';
import batidosReducer from './batidosReducer';
import validacionReducer from './validacionReducer';


export default combineReducers({
    batidos: batidosReducer,
    error: validacionReducer
});