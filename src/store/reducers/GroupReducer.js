import {GET_GROUPS, SET_CURRENT_GROUP, UPDATE_LAST_MESSAGE} from '../actions/actionTypes';

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
        case UPDATE_LAST_MESSAGE:
            let newGroups = []
            state.groups.map(g => {
                if(g.id == action.payload.id){
                    g.text = action.payload.text;
                }
                newGroups.push(g);
            })            
            return{
                ...state,
                groups: newGroups,
            }
        default:
            return state;
    }
}

export default reducer;