import {ADD_MESSAGE, SET_MESSAGES, GET_GROUPS, SET_CURRENT_GROUP} from '../actions/actionTypes';

const initialState = {
    messages: [],
    groups: [],
    currentGroup: {id: 1, name: "General"},

    groups: {

    }

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
        case GET_GROUPS:
            return {
                ...state,
                groups: action.payload,
            }
        case SET_CURRENT_GROUP:
            return{
                ...state,
                currentGroup: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;