import axios from 'axios';
import {GET_ERRORS, SET_CURRENT_USER} from './actionTypes';
const qs = require('querystring')


export const loginUser = (user) => dispatch => {

    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    
    axios.post('http://localhost:8080/ChatRoom/rest/user/login', qs.stringify(user), config)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err,
                });
            });
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