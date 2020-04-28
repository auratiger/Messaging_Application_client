import React, {Component} from 'react';
import classes from './MainPage.module.css';
import ChatWindow from '../../components/chatWindow/ChatWindow';

class MainPage extends Component {
    render(){

        return(
            // <div className={classes.App}>
                <ChatWindow/>
            // </div>
        )
    }
}

export default (MainPage);