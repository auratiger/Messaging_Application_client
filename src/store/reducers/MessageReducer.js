import * as actionTypes from '../actions/actionTypes'
import Singleton from '../../socket';

const socket = Singleton.getInstance();

const initialState = {
    messages: [
        {
            text: "hello",
            time: "15:45",
            user: "goshe",
            myMessage: true,
        },
        {
            text: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            time: "15:46",
            user: "koce",
            myMessage: false,
        },
        {
            text: "sup",
            time: "15:46",
            user: "goshe",
            myMessage: true,
        },
    ],
    userMessagesColor: "blue",
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_MESSAGE:
            let msg = JSON.stringify(action.newMsg);
            console.log(msg);
            socket.send(msg);


            return{
                ...state,
                messages: [...state.messages, action.newMsg]
            }
        default:
            return state;
    }
}

export default reducer;