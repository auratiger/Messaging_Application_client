import React, {Component} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './SignUp.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import * as actionTypes from '../../../store/actions/actionTypes';

class SignUp extends Component {

    state = {
        
        user: {
            firstName: {text: "", valid: true},
            lastName : {text: "", valid: true},
            day      : {text: "", valid: true},
            month    : {text: "", valid: true},
            year     : {text: "", valid: true},
            username : {text: "", valid: true},
            email    : {text: "", valid: true},
            password : {text: "", valid: true},
            confirm  : {text: "", valid: true},
        },

        confirmed : false,
        redirect: false,
    }

    messagesValidateHandler(event){
        const name = event.target.name;
        const text = event.target.value;
        let valid = false;

        switch(name){
            case "password":
                var patt = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
                valid = patt.test(text);
                break;
            case "confirm":
                if(text === this.state.user.password.text){
                    valid = true;
                }
                break;
            default:
                var patt = /.{1,20}/;
                valid = patt.test(text);
        }


        this.setState({
            ...this.state,
            user: {...this.state.user ,[name]: {"text": text, "valid": valid}},
        })

        console.log(this.state.user);      
    }

    sendFormHandler(event){

        const pad = (num) => {
            return (num < 10 ? "0" : "") + num;
        }
        
        //TODO the data should be encrypted before sending

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
                            name="firstName" type="text" text="First Name" 
                            valid = {this.state.user.firstName.valid}/>                                
                        <Input changed={(event) => this.messagesValidateHandler(event)} 
                            name="lastName" type="text" text="Last Name"
                            valid = {this.state.user.lastName.valid}/>                                
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
                        name="username" type="text" text="Username"
                        valid = {this.state.user.username.valid}/>   
                    <Input changed={(event) => this.messagesValidateHandler(event)} 
                        name="email" type="email" text="Email"
                        valid = {this.state.user.email.valid}/>   
                    <Input changed={(event) => this.messagesValidateHandler(event)} 
                        name="password" type="password" text="Password"
                        valid = {this.state.user.password.valid}/>   
                    <Input changed={(event) => this.messagesValidateHandler(event)} 
                        name="confirm" type="password" text="Confirm password"
                        valid = {this.state.user.confirm.valid}/>   
                </form>
                <div>
                    <Button text="Continue" clicked={(event) => {
                        this.sendFormHandler(event)
                        this.props.history.push("/profile")
                        }}/>
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