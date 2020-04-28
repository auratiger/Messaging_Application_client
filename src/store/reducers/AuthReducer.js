import {SET_CURRENT_USER} from '../actions/actionTypes';
import {isEmpty} from '../../validation/isEmpty';
import parseJwt from '../../jwtParser/parseJwt';

const initialState = () => {
    if(localStorage.jwtToken){
        const decoded = parseJwt(localStorage.jwtToken);

        return {
            isAuthenticated: true,
            user: JSON.parse(decoded.sub),
        }
    }else{
        return {
            isAuthenticated: false,
            user: {},
        }
    }
}

export default function(state = initialState(), action) {
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };
        default:
            return state;
    }
};