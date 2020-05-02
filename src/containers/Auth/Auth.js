import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Auth.module.css';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';

class Auth extends Component{

    state = {
        create_new: false,
    }

    createNewUserHandler = props => {
        this.setState({create_new: !this.state.create_new})
    }

    render(){

        let page = <Login clicked={this.createNewUserHandler} {...this.props}/>

        if(this.state.create_new){
            page = <SignUp clicked={this.createNewUserHandler} {...this.props}/>
        }

        return(
            <div className={classes.Auth}>
                {page}
            </div>
        )
    }
}

export default connect()(Auth);