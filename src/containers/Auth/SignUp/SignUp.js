import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './SignUp.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import * as actionTypes from '../../../store/actions/actionTypes';

const SignUp = (props) => {
    return(
        <div>
            <h1>Sign Up</h1>
            <form>
                <div className={classes.box}>
                    <Input type="text" text="First Name"/>                                
                    <Input type="text" text="Last Name"/>                                
                </div>
                <div className={classes.box}>
                    <Input type="text" text="day"/>                                
                    <Input type="text" text="month"/>                                
                    <Input type="text" text="year"/>                                
                </div>

                <Input type="text" text="UserName"/>   
                <Input type="email" text="Email"/>   
                <Input type="password" text="Password"/>   
                <Input type="password" text="Confirm password"/>   
            </form>
            <div>
                <Button text="Continue" type="submit"/>
            </div>
            <NavLink to={"auth"} onClick={props.clicked}>Log in</NavLink>                
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return{
        onSignUp: () => dispatch(actionTypes.USER_SIGN_UP),
    };
};

export default connect(null, mapDispatchToProps)(SignUp);