import React, {Component} from 'react';

import classes from './MainPage.module.css';
import Aux from '../../hoc/Aux'
import Singleton from '../../socket';
import ChatWindow from '../../components/chatWindow/ChatWindow';

class MainPage extends Component {
    render(){

        let socket = Singleton.getInstance()
        
        return(
            <Aux>
                <div className={classes.App}>
                    <ChatWindow/>
                </div>
            </Aux>
        )
    }
}

export default MainPage;