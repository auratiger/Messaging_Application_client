import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../../store/actions/authentication';
    
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class Login extends Component {

    state = {
        email: "",
        password: "",
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

        this.props.loginUser(user, this.props.history);
    }

    render(){

        return(
            <div>
                <h1>Log In</h1>
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                id="email" 
                                label="Email*"
                                name="email"
                                type="email"
                                variant="outlined"
                                value={this.state.email}
                                onChange={this.handleInputChange}/> 
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                id="password" 
                                label="Password*"
                                name="password"
                                type="password"
                                variant="outlined"
                                value={this.state.password}
                                onChange={this.handleInputChange}/>  
                        </Grid>
                    </Grid>

                    <br/>

                    <ButtonGroup
                        orientation="vertical"
                        color="primary"
                        aria-label="vertical outlined primary button group">

                        <Button variant="outlined" 
                                color="primary" 
                                size='medium' 
                                onClick={this.handleSubmit}>
                            Submit
                        </Button>

                        <Button variant="outlined" 
                                color="primary" 
                                size='medium' 
                                onClick={this.props.clicked}>
                            Create account
                        </Button> 

                    </ButtonGroup>             
                    <button style={{display: "none"}}></button>
                </form>
            </div>
        )
    }
}

export default connect(null, {loginUser})(Login);