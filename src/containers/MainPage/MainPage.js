import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './MainPage.module.css';
import Aux from '../../hoc/Aux'
import ChatWindow from '../../components/chatWindow/ChatWindow';

class MainPage extends Component {
    render(){

        return(
            <Aux>
                <div className={classes.App}>
                    <ChatWindow/>
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = () => {
    
}

export default connect(mapStateToProps)(MainPage);