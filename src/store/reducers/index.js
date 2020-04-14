import { combineReducers } from 'redux';
import errorReducer from './ErrorReducer';
import authReducer from './AuthReducer';
import messageReducer from './MessageReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    messages: messageReducer,
});