import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import messageReducer from './store/reducers/MessageReducer';
import authReducer from './store/reducers/AuthReducer';
import errorReducer from './store/reducers/ErrorReducer';

const inititalState = {};

const rootReducers = combineReducers({
    message: messageReducer,
    errors: errorReducer,
    user: authReducer,
})

const store = createStore(rootReducers, inititalState, applyMiddleware(thunk));

ReactDOM.render(<BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
