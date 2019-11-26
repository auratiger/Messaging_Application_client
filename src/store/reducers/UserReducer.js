import * as actionTypes from '../actions/actionTypes';
import Singleton from '../../socket';

const initialState = {
    users: [{
        firstName: "koce",
        lastName : "genov",
        username: "carnivore",
        age      : "24",
        email    : "koce123@gmial.com",
        password : "koce123",
    }],

    securityToken: "s",
}

const socket = Singleton.getInstance();

const userReducer = (state = initialState, action) => {

    let jsonObject;

    switch (action.type){
        case actionTypes.USER_LOG_IN:            
            return state
            
        case actionTypes.USER_LOG_OUT:

            jsonObject = {type: "USER_LOGIN", msg: action.object}
            socket.send(jsonObject);
            
            return {
                ...state,
                securityToken: null,
            }
        case actionTypes.USER_SIGN_UP:
            console.log("signing up");

            jsonObject = {type: "USER_SIGNUP", msg: action.object}
            socket.send(JSON.stringify(jsonObject));

            let updatedUsers = [...state.users, action.newUser]
            return {
                ...state,
                users: updatedUsers
            };
        default:
            return state;
    };
};

export default userReducer;