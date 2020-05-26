import {CREATE_CONNECTION, CLOSE_CONNECTION} from '../actions/actionTypes';

const initialState = {
    ws: null,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_CONNECTION:
            return{
                ws: action.payload,
            }
        case CLOSE_CONNECTION:
            return{
                ws: null,
            }
        default:
            return state
    }
}

export default reducer;