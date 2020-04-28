import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './Toolbar.module.css';
import {logoutUser} from '../../../store/actions/authentication';

const toolbar = (props) => {

    let user = props.isAuthenticated ? props.username : "User"
    let auth = <NavLink to={"/auth"} exact>Log in</NavLink>    

    if (props.isAuthenticated){
        auth = <NavLink to={"/auth"} onClick={() => props.logoutUser()} exact>Log out</NavLink>
    }

    return(
        <header>
            <nav className={classes.Toolbar}>
                <ul className={classes.NavigationItems}>
                    <li className={classes.NavigationItem}>
                        {auth}
                    </li>
                    <li className={classes.NavigationItem}>
                        <NavLink to={"/"} exact>Profile</NavLink>
                    </li>
                    <li className={[classes.NavigationItem, classes.User].join(" ")}>
                        <NavLink to={"/Profile"} exact>{user}</NavLink>
                    </li>
                </ul>
            </nav>
        </header>   
    );
};

const mapStateToProps = state => {
    return{
        username: state.auth.user.username,
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps, {logoutUser})(toolbar);