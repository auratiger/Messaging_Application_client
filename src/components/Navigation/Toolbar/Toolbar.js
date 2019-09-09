import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './Toolbar.module.css';

const toolbar = (props) => {

    let user = props.curUser ? props.curUser.username : "User"

    return(
        <header>
            <nav className={classes.Toolbar}>
                <ul className={classes.NavigationItems}>
                    <li className={classes.NavigationItem}>
                        <NavLink to={"/auth"} exact>Log in</NavLink>
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
        curUser: state.user.curUser,
    };
};

export default connect(mapStateToProps)(toolbar);