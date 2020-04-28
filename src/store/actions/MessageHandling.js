import axios from 'axios';
import {GET_ERRORS, SET_MESSAGES, ADD_MESSAGE} from './actionTypes';

export const getMessages = (user) => dispatch => {
    axios.post("http://localhost:8080/ChatRoom/rest/chat/resource/messages/"+user.id+"/1", user)
        .then(res => {                        
            dispatch(setMessages(res.data.messages))
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err,
            });
        })
}

export const setMessages = messages => {
    return {
        type: SET_MESSAGES,
        payload: messages,
    }
}

export const addMessage = message => dispatch => {
    dispatch({
        type: ADD_MESSAGE,
        payload: message,
    })
}