import {ADD_MESSAGE, SET_MESSAGES} from '../actions/actionTypes';

const initialState = {
    messages: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_MESSAGE:
            return{
                messages: [...state.messages, action.payload]
            }
        case SET_MESSAGES:
            return{
                messages: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;