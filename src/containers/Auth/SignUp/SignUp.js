import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './SignUp.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

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

export default SignUp;