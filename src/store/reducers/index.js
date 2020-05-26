import { combineReducers } from 'redux';
import errorReducer from './ErrorReducer';
import authReducer from './AuthReducer';
import messageReducer from './MessageReducer';
import WebSocketReducer from './WebSocketReducer';
import GroupReducer from './GroupReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    messages: messageReducer,
    webSocket: WebSocketReducer,
    groups: GroupReducer,
});