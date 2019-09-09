import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users: [{
        firstName: "koce",
        lastName : "genov",
        username: "carnivore",
        age      : "24",
        email    : "koce123@gmial.com",
        password : "koce123",
    }],

    curUser: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.USER_LOG_IN:
            return state
            
        case actionTypes.USER_LOG_OUT:
            return {
                ...state,
                curUser: null,
            }
        case actionTypes.USER_SIGN_UP:
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