import axios from 'axios';
import {GET_ERRORS, SET_CURRENT_USER} from './actionTypes';
import {setAuthToken} from '../../setAuthToken';
const qs = require('querystring')

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};


export const loginUser = (user) => dispatch => {

    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    
    axios.post('http://localhost:8080/ChatRoom/rest/user/login', qs.stringify(user), config)
            .then(res => {
                const token = res.data;
                localStorage.setItem("jwtToken", token);
                setAuthToken(token)
                const decoded = parseJwt(token);             
                dispatch(setCurrentUser(decoded))
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err,
                });
            });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    }
}

export const createUser = (user) => dispatch => {
    axios.post('http://localhost:8080/ChatRoom/rest/user/signup', user)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err,
                })
            })
}