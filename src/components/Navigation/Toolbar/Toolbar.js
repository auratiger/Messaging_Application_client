import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './Toolbar.module.css';
import {logoutUser} from '../../../store/actions/authentication';
import {closeWebSocket} from '../../../store/actions/WebSocket';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const toolbar = withRouter((props) => {

    let user = props.isAuthenticated ? props.username : "User"
    let auth = props.isAuthenticated ? "Log out" : "Log in"
    let fun = () => {
        if(props.isAuthenticated){
            props.logoutUser();
            props.ws.close();
            props.closeWebSocket();
        }
        props.history.push("/auth")
    }

    return(
        <header>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h5" className={classes.root}>
                            {user}
                        </Typography>
                        <Button color="inherit" onClick={fun}>{auth}</Button>
                    </Toolbar>
                </AppBar>   
            </div>
        </header>   
    );
}); 

const mapStateToProps = state => {
    return{
        username: state.auth.user.username,
        isAuthenticated: state.auth.isAuthenticated,
        ws: state.webSocket.ws,
    };
};

export default connect(mapStateToProps, {logoutUser, closeWebSocket})(toolbar);