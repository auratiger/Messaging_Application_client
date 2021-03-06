import React, {Component} from 'react';
import {connect} from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import classes from './ChatWindow.module.css';
import ChatMessage from './chatMessage/ChatMessage';
import GroupBlock from './groupBlock/GroupBlock';

import {addMessage, getMessages} from '../../store/actions/MessageHandling';

class ChatWindow extends Component {

    constructor(props){
        super(props);

        this.state = {
            ws: null,
            message: "",
            loaded: false,
            wsError: false,
        }
    }

    componentDidMount(){
        this.props.getMessages(this.props.user).then(() => {
            this.setState({loaded: true});
            this.connect();
        });
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
            if(e.code === 1003){
                
                ws.close();
                this.setState({
                    ...this.state,
                    wsError: true,
                })
            }else{
                console.log(
                    `Socket is closed. Reconnect will be attempted in ${Math.min(
                        10000 / 1000,
                        (that.timeout + that.timeout) / 1000
                    )} second.`,
                    e.reason
                );
    
                that.timeout = that.timeout + that.timeout; //increment retry interval
                connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
            }
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
        if((!ws || ws.readyState === WebSocket.CLOSED) && !this.state.wsError) this.connect();
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

        let messages;
        let groups = this.props.groups.map(group => {
            return(
                <GroupBlock id={group.id} name={group.name}></GroupBlock>
            )
        });        

        if(this.state.loaded){
            messages = this.props.msg.map(message =>{

                let orientation = this.props.user.username === message.author;            
    
                return(
                    <ChatMessage key={message.id} 
                                user={message.author}
                                text={message.text} 
                                time={message.created}
                                class={orientation}
                                image={this.props.user.userIcon}/>
                )
            })
        }else{
            messages = <CircularProgress />;
        }



        return(
            <Grid container alignItems="stretch" direction="row" justify="space-between">

                <Grid container direction="column" className={classes.leftBox} xs={2}>
                    <Grid container className={classes.toolBox}>
                        <p>toolBox</p>
                        <Button>create Group</Button>
                    </Grid>
                    {groups}
                </Grid>

                <Grid container direction="row" justify="space-between" xs={8}>
                    <Grid item xs={12}>
                        <div id="chat" className={classes.chatDisplay}>
                            {messages}
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        {/* <textarea 
                                id="text" 
                                placeholder="Write a message"
                                autoFocus={true}
                                value={this.state.message}
                                className={classes.chatBox} 
                                onKeyDown={this.sendMessage}
                                onChange={this.messageHandler}>
                        </textarea> */}
                        <TextField
                            id="textField"
                            placeholder="Message"
                            variant="outlined"
                            multiline
                            fullWidth
                            rows={3}
                            value={this.state.message}
                            onChange={this.messageHandler}
                            onKeyDown={this.sendMessage}>

                        </TextField>
                    </Grid>
                </Grid>

                <Grid container direction="column" className={classes.rigthBox} xs={2}>
                    {/* <div className={classes.rigthBox}></div> */}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return{
        msg: state.resources.messages,
        groups: state.resources.groups,
        user: state.auth.user,
    };
};

export default connect(mapStateToProps, {addMessage, getMessages})(ChatWindow);