import * as actionTypes from '../actions/actionTypes';
import * as statusTypes from '../actions/statusTypes';

// const socket = Singleton.getInstance();

const initialState = {
    messages: [
        {
            text: "hello",
            time: "15:45",
            user: "goshe",
            myMessage: true,
        },
        {
            text: "why hello there",
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
            // let jsonObject = {type: statusTypes.userMessage(), msg: action.newMsg}
            // let msg = JSON.stringify(jsonObject);
            // socket.send(msg);


            return{
                ...state,
                messages: [...state.messages, action.newMsg]
            }
        default:
            return state;
    }
}

export default reducer;