import React from 'react';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button'
import {NavLink} from 'react-router-dom';

const Login = (props) => {
    return(
        <div>
            <h1>Log In</h1>
            <form>
                <Input type={"email"} text={"Email"}/>
                <Input type={"password"} text={"Password"}/>
                <div>
                    <Button text="Continue" type="submit"/>
                </div>
                <NavLink to={"auth"} onClick={props.clicked}>Sign Up</NavLink>                
            </form>
        </div>
    )
}

export default Login;