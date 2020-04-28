import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './ChatWindow.module.css';
import ChatMessage from './chatMessage/ChatMessage';
import {addMessage, getMessages} from '../../store/actions/MessageHandling';
class ChatWindow extends Component {

    constructor(props){
        super(props);

        this.state = {
            ws: null,
            message: "",
            loaded: false,
        }
    }

    componentDidMount(){
        this.connect();
        this.props.getMessages(this.props.user);
    }

    timeout = 250;

    connect = () => {
        var ws = new WebSocket("ws://localhost:8080/ChatRoom/chat/"+this.props.user.id);
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

                if(this.state.message.trim() === ""){
                    return;
                }                

                const obj = {
                    roomid: 1,
                    message: this.state.message,
                }
                  
                try{
                    ws.send(JSON.stringify(obj));    
                }catch(err){                    
                    console.log(err);
                }

                // TODO: this is a temporary solution untill I find a better way to display the date -=-=-=-=-=-
                let date = new Date();
                let rep = (number) => {
                    return number < 10 ? "0" + number : number;
                }

                this.props.addMessage({
                    text: this.state.message,
                    user: this.props.user.username,
                    created: date.getFullYear() + "-" + rep(date.getMonth()) + "-" + rep(date.getDate()) + " " + date.getHours() + ":" + date.getMinutes(),
                });
                // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

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

            let orientation = this.props.user.username === message.user;            

            return(
                <ChatMessage key={message.text + message.created + message.user} 
                            user={message.user}
                            text={message.text} 
                            time={message.created}
                            class={orientation}/>
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

export default connect(mapStateToProps, {addMessage, getMessages})(ChatWindow);