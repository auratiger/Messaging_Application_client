import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginUser} from '../../../store/actions/authentication';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

class Login extends Component {

    state = {
        email: null,
        password: null,
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
        }

        this.props.loginUser(user);
    }

    render(){
        return(
            <div>
                <h1>Log In</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input  type={"email"} 
                            text={"Email"} 
                            changed={this.handleInputChange} 
                            name="email"
                            max="64"
                            valid={true}/>
                    <Input type={"password"} 
                           text={"Password"}
                           changed={this.handleInputChange}
                           name="password"
                           max="30"
                           valid={true}/>
                    <div>
                        <Button text="send"/>
                    </div>
                    <NavLink to={"auth"} onClick={this.props.clicked}>Sign Up</NavLink>                
                </form>
            </div>
        )
    }
}

export default connect(null, {loginUser})(Login);