import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './Toolbar.module.css';
import * as actionTypes from '../../../store/actions/actionTypes';

const toolbar = (props) => {

    let user = props.securityToken ? props.username : "User"
    let auth = <NavLink to={"/auth"} exact>Log in</NavLink>

    if (props.securityToken){
        auth = <NavLink to={"/auth"} onClick={() => props.onLogOut()} exact>Log out</NavLink>
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
                    <li className={classes.NavigationItem}>
                        <select>
                            <option value="volvo">red</option>
                            <option value="saab">green</option>
                            <option value="mercedes">yellow</option>
                            <option value="audi">blue</option>
                        </select>
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
        securityToken: state.user.securityToken,
        username: state.user.users[0].username,
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onLogOut: () => dispatch({type: actionTypes.USER_LOG_OUT}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(toolbar);