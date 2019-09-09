import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button'
import * as actionTypes from '../../../store/actions/actionTypes';

const Login = (props) => {
    return(
        <div>
            <h1>Log In</h1>
            <form>
                <Input type={"email"} text={"Email"}/>
                <Input type={"password"} text={"Password"}/>
                <div>
                    <Button text="Continue"/>
                </div>
                <NavLink to={"auth"} onClick={props.clicked}>Sign Up</NavLink>                
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return{
        onLogin: () => dispatch(actionTypes.USER_LOG_IN),
    };
};

export default connect(null, mapDispatchToProps)(Login);