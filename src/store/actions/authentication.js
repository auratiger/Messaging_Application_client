import axios from 'axios';
import {GET_ERRORS, SET_CURRENT_USER} from './actionTypes';
import {setAuthToken} from '../../setAuthToken';
import parseJwt from '../../jwtParser/parseJwt';
const qs = require('querystring')

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
                dispatch(setCurrentUser(JSON.parse(decoded.sub)))
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

export const createUser = (user, history) => dispatch => {
    axios.post('http://localhost:8080/ChatRoom/rest/user/signup', user)
            .then(res => history.push('/auth'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err,
                })
            })
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/auth');
};