import {ADD_MESSAGE, SET_MESSAGES} from '../actions/actionTypes';

const initialState = {
    messages: [],
    groups: [{
        id: 1,
        name: "general",
        users: [],
    }],
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_MESSAGE:
            return{
                ...state,
                messages: [...state.messages, action.payload]
            }
        case SET_MESSAGES:
            return{
                ...state,
                messages: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;