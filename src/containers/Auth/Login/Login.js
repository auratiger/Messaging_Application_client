import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button'
import * as actionTypes from '../../../store/actions/actionTypes';

class Login extends Component {

    state = {
        email: null,
        password: null,
    }

    emailChangeHandler = (event) => {
        this.setState({
            ...this.state,
            email: event.targer.value
        });
    }

    passwordChangeHandler = (event) => {
        this.setState({
            ...this.state,
            email: event.targer.value
        });
    }

    render(){
        return(
            <div>
                <h1>Log In</h1>
                <form>
                    <Input type={"email"} text={"Email"} valid={true}/>
                    <Input type={"password"} text={"Password"} valid={true}/>
                    <div>
                        <Button text="Continue"/>
                    </div>
                    <NavLink to={"auth"} onClick={this.props.clicked}>Sign Up</NavLink>                
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLogin: () => dispatch(actionTypes.USER_LOG_IN),
    };
};

export default connect(null, mapDispatchToProps)(Login);