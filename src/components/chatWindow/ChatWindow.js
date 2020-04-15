import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './ChatWindow.module.css';
import ChatMessage from './chatMessage/ChatMessage';
import {ADD_MESSAGE} from '../../store/actions/actionTypes';

class ChatWindow extends Component {

    constructor(props){
        super(props);

        this.state = {
            ws: null,
            message: ""
        }
    }

    componentDidMount(){
        this.connect();
    }

    timeout = 250;

    connect = () => {
        var ws = new WebSocket("ws://localhost:8080/ChatRoom/chat");
        let that = this;
        var connectInterval;

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");

            this.setState({ ws: ws });

            that.timeout = 250; // reset timer to 250 on open of websocket connection 
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };

        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
        };

        // websocket onerror event listener
        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };

        ws.onmessage = message => {
            console.log("message from server: " + message.data);
            this.props.addMessage(JSON.parse(message.data));
        }
    }

    check = () => {
        const {ws} = this.state;
        if(!ws || ws.readyState === WebSocket.CLOSED) this.connect();
    };

    sendMessage = (event) => {
        switch(event.which){
            case 13:
                event.preventDefault();

                const {ws} = this.state;

                const obj = {
                    user: this.props.user,
                    message: this.state.message,
                }
                  
                try{
                    ws.send(JSON.stringify(obj));    
                }catch(err){
                    console.log(err);
                }

                // this.props.addMessage(this.state.message);
                this.setState({...this.state, message: ""});
                return true;
            default:
                return false;
        }
    }

    messageHandler = (event) => {
        this.setState({...this.state, message: event.target.value})
    }

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
                    value={this.state.message}
                    className={classes.chatBox} 
                    onKeyDown={this.sendMessage}
                    onChange={this.messageHandler}></textarea>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        msg: state.messages.messages,
        user: state.auth.user,
    };
};

const mapDispatchToProps = dispatch => ({
    addMessage: (message) => dispatch({type: ADD_MESSAGE, payload: message})
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);