import {ADD_MESSAGE, SET_MESSAGES} from '../actions/actionTypes';
// const socket = Singleton.getInstance();

const initialState = {
    messages: [],
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