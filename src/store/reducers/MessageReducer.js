import * as actionTypes from '../actions/actionTypes';
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
            return{
                ...state,
                messages: [...state.messages, action.payload]
            }
        default:
            return state;
    }
}

export default reducer;