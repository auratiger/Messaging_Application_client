import axios from 'axios';
import {GET_ERRORS} from './actionTypes';

export const verifyEmail = () => dispatch => {
    console.log(window.location.pathname);    
    
    axios.post("http://localhost:8080/ChatRoom/rest" + window.location.pathname)
        .then(res => {
            console.log(res);
            console.log("email verified");
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err,
            });
        })
}
