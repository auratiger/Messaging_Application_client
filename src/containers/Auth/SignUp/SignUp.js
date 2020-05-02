import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createUser} from '../../../store/actions/authentication'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';

class SignUp extends Component {

    state = {
        
        user: {
            firstName: {text: "", valid: true},
            lastName : {text: "", valid: true},
            username : {text: "", valid: true},
            email    : {text: "", valid: true},
            password : {text: "", valid: true},
            confirm  : {text: "", valid: true},
            date     : null,
        },

        confirmed : false,
        redirect: false,
    }

    messagesValidateHandler = (event) => {
        const name = event.target.name;
        const text = event.target.value;
        let valid = false;
        let patt;

        switch(name){
            case "email":
                patt = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
                valid = patt.test(text);                
                break;
            case "confirm":
                if(text === this.state.user.password.text){
                    valid = true;
                }
                break;
            default:
                patt = /.{1,20}/;
                valid = patt.test(text);
        }

        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [name]: {"text": text, "valid": valid}},
        })
    }

    handleDateChange = (date) => {
        // TODO add a check that the date isn't from the past 3-4 years

        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                "date": date,
            }
        });
    }

    handleSubmit = (event) => {   

        event.preventDefault()
        
        //TODO the data should be encrypted before sending

        const object = {
            firstName: this.state.user.firstName.text,
            lastName: this.state.user.lastName.text,
            date: this.state.user.date,
            username: this.state.user.username.text,
            email: this.state.user.email.text,
            password: this.state.user.password.text,
        };        

        this.setState({});

        this.props.createUser(object, this.props.history);
    }
    
    render(){

        return(
            <div >
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <TextField 
                                error={!this.state.user.firstName.valid}
                                fullWidth
                                id="firstName" 
                                label="First Name*"
                                name="firstName"
                                variant="outlined"
                                helperText={this.state.user.firstName.valid ? "" : "limit up to 20 characters"}
                                value={this.state.user.firstName.text}
                                onChange={this.messagesValidateHandler}/>    
                        </Grid>           

                        <Grid item xs={6}>                
                            <TextField 
                                error={!this.state.user.lastName.valid}
                                fullWidth
                                id="lastName" 
                                label="Last Name*"
                                name="lastName"
                                variant="outlined"
                                helperText={this.state.user.lastName.valid ? "" : "limit up to 20 characters"}
                                value={this.state.user.lastName.text}
                                onChange={this.messagesValidateHandler}/>                               
                        </Grid>

                        <Grid item xs={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                <KeyboardDatePicker
                                    fullWidth
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date of birth"
                                    format="MM/dd/yyyy"
                                    value={new Date()}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />
                            </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                error={!this.state.user.username.valid}
                                fullWidth
                                id="username" 
                                label="Username*"
                                name="username"
                                variant="outlined"
                                helperText={this.state.user.username.valid ? "" : "limit up to 20 characters"}
                                value={this.state.user.username.text}
                                onChange={this.messagesValidateHandler}/>   
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                error={!this.state.user.email.valid}
                                fullWidth
                                id="email" 
                                label="Email*"
                                name="email"
                                type="email"
                                variant="outlined"
                                helperText={this.state.user.email.valid ? "" : "email is not valid"}
                                value={this.state.user.email.text}
                                onChange={this.messagesValidateHandler}/>    
                        </Grid>

                        <Grid item xs={6}>
                            <TextField 
                                error={!this.state.user.password.valid}
                                fullWidth
                                id="password" 
                                label="Password*"
                                name="password"
                                type="password"
                                variant="outlined"
                                helperText={this.state.user.password.valid ? "" : "limit up to 20 characters"}
                                value={this.state.user.password.text}
                                onChange={this.messagesValidateHandler}/>    
                        </Grid>

                        <Grid item xs={6}>
                            <TextField 
                                error={!this.state.user.confirm.valid}
                                fullWidth
                                id="confpassword" 
                                label="Confirm password*"
                                name="confirm"
                                type="password"
                                variant="outlined"
                                helperText={this.state.user.confirm.valid ? "" : "limit up to 20 characters"}
                                value={this.state.user.confirm.text}
                                onChange={this.messagesValidateHandler}/>   
                        </Grid>
                    </Grid> 

                    <br/>

                    <ButtonGroup
                        orientation="vertical"
                        color="primary"
                        aria-label="vertical outlined primary button group">
                        
                        <Button variant="outlined" color="primary" size='medium' onClick={this.handleSubmit}>
                            Submit
                        </Button>
                        
                        <Button variant="outlined" color="primary" size='medium' onClick={this.props.clicked}>
                            Log in 
                        </Button>

                    </ButtonGroup> 
                    <button style={{display: "none"}}></button>

                </form>              
            </div>
        )
    }
}

export default connect(null, {createUser})(SignUp);