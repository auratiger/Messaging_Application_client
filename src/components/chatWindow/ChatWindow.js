import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './ChatWindow.module.css';
import ChatMessage from './chatMessage/ChatMessage';
import * as actionTypes from '../../store/actions/actionTypes';

class ChatWindow extends Component {


    autoscrollToBottom(){
        let i = document.getElementById("chat")
        if(i){
            i.scrollTop = i.scrollHeight - i.clientHeight;
        }
    }

    componentDidUpdate(){
        this.autoscrollToBottom()
    }

    render(){

        const messageHandler = (event) => {
            switch(event.which){
                case 13: // enter|select key
                    let textarea = document.getElementById("text")
                    let text = textarea.value;
                    if(text){
                        let today = new Date()
                        // let time = today.getHours() + ":" + today.getMinutes()
                        let time = today.toLocaleTimeString() 

                        let msg = {
                            text: text,
                            time: time,
                            user: "goshe",
                            myMessage: true,
                        }

                        this.props.onAddMessage(msg)
                        textarea.value = ''
                    }
                    
                    event.preventDefault();
                    return true;
                default:
                    return false;
            }
        }

        let messages = this.props.msg.map(message =>{
            return(

                <ChatMessage key={message.text + message.time} 
                            user={message.user}
                            text={message.text} 
                            time={message.time}
                            class={message.myMessage}/>
            )
        })

        return(
            <div className={classes.chat}>
                <div id="chat" className={classes.chatDisplay}>
                    {messages}
                </div>
                <textarea 
                    id="text" 
                    placeholder="Write a message"
                    autoFocus={true}
                    className={classes.chatBox} 
                    onKeyDown={messageHandler}></textarea>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        msg: state.message.messages
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onAddMessage: (msg) => dispatch({type: actionTypes.ADD_MESSAGE, newMsg: msg})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);