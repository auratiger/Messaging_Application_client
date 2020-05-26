import {GET_GROUPS, SET_CURRENT_GROUP} from '../actions/actionTypes';

const initialState = {
    groups: [],
    currentGroup: {id: 1, name: "General"},
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        
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