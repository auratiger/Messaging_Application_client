import React, {Component} from 'react';
import classes from './MainPage.module.css';
import Aux from '../../hoc/AuxContainer'
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

export default (MainPage);