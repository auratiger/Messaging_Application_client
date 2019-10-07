import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './SignUp.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import * as actionTypes from '../../../store/actions/actionTypes';

class SignUp extends Component {

    state = {
        firstName: "",
        lastName : "",
        day      : "",
        month    : "",
        year     : "",
        username : "",
        email    : "",
        password : "",
        confirm  : "",
    }

    onComponentDidMount(){

    }

    messagesValidateHandler(event){
        const name = event.target.name;
        const text = event.target.value;
        
        this.setState({
            ...this.state,
            [name]: text,
        })

        switch(name){
            
        }
    }

    sendFormHandler(event){

        const pad = (num) => {
            return (num < 10 ? "0" : "") + num;
        }
        
        //TODO the password should be encrypted before sending

        const object = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            date: this.state.year + "-" + pad(this.state.month) + "-" + pad(this.state.day),
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        };        

        this.setState({});

        this.props.onSignUp(object);
    }
    
    render(){
        return(
            <div >
                <h1>Sign Up</h1>
                <form>
                    <div className={classes.box}>
                        <Input changed={(event) => this.messagesValidateHandler(event)} 
                            name="firstName" type="text" text="First Name"/>                                
                        <Input changed={(event) => this.messagesValidateHandler(event)} 
                            name="lastName" type="text" text="Last Name"/>                                
                    </div>
                    <div className={classes.box}>
                        <Input changed={(event) => this.messagesValidateHandler(event)} 
                            name="day" max="31" type="number" text="Day"/>   
                        <Input changed={(event) => this.messagesValidateHandler(event)} 
                            name="month" max="12" type="number" text="Month"/>   
                        <Input changed={(event) => this.messagesValidateHandler(event)} 
                            name="year" max="2019" type="number" text="Year"/>   
                    </div>
    
                    <Input changed={(event) => this.messagesValidateHandler(event)} 
                        name="username" type="text" text="Username"/>   
                    <Input changed={(event) => this.messagesValidateHandler(event)} 
                        name="email" type="email" text="Email"/>   
                    <Input changed={(event) => this.messagesValidateHandler(event)} 
                        name="password" type="password" text="Password"/>   
                    <Input changed={(event) => this.messagesValidateHandler(event)} 
                        name="confirm" type="password" text="Confirm password"/>   
                </form>
                <div>
                    <Button text="Continue" clicked={(event) => this.sendFormHandler(event)}/>
                </div>
                <NavLink to={"auth"} onClick={this.props.clicked}>Log in</NavLink>                
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onSignUp: (object) => dispatch({type: actionTypes.USER_SIGN_UP, object: object}),
    };
};

export default connect(null, mapDispatchToProps)(SignUp);