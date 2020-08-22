import axios from 'axios';
import {CREATE_GROUP, GET_GROUPS, SET_CURRENT_GROUP, UPDATE_LAST_MESSAGE} from './actionTypes';

export const getGroups = (user) => dispatch => {
    axios.get('http://localhost:8080/ChatRoom/rest/chat/resource/rooms/' + user.id)
      .then(response => {
        let newConversations = response.data.groups.map(result => {          
          return {
            id: result.id,
            image: "data:image/png;base64," + result.image,
            name: result.name,
            users: result.users,
            text: result.message,
          };
        });
        dispatch(setGroups(newConversations));        
    }).catch(err => {
      console.log("error");
    });
}

export const setGroups = (groups) => dispatch => {
    dispatch({
        type: GET_GROUPS,
        payload: groups
    })
}

export const setCurrentGroup = (currentGroup) => dispatch => {  
    dispatch({
      type: SET_CURRENT_GROUP,
      payload: currentGroup,
    })
}

export const updateLastMessage = (newMessage) => dispatch => {
  dispatch({
    type: UPDATE_LAST_MESSAGE,
    payload: newMessage,
  })
}

export const createGroup = (user, groupName) => dispatch => {
    axios.post('http://localhost:8080/ChatRoom/rest/chat/resource/rooms/' + user.id + "/" + groupName)
      .then(resp => {
        console.log("created group");
      })
      .catch(err => {
        console.log("error");
    })
}