import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import Compose from '../Compose/Compose';
import Toolbar from '../Toolbar/Toolbar';
import ToolbarButton from '../ToolbarButton/ToolbarButton';
import Message from '../Message/Message';
import moment from 'moment';

import { addMessage, getMessages } from '../../../store/actions/MessageHandling';

import './MessageList.css';

const MessageList = (props) => {
  const [userMessage, setUserMessage] = useState("");
  const [ws, setWs] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [wsError, setWsError] = useState(false);
  const messagesEndRef = useRef(null)

  useEffect(() => {
    props.getMessages(props.user).then(() => {
      setLoaded(true);
      connect();
    });    
  }, [])

  const autoscrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    autoscrollToBottom();
  })

  let timeout = 250;

  const connect = () => {
    var ws = new WebSocket("ws://localhost:8080/ChatRoom/chat/" + props.user.id);
    var connectInterval;

    // websocket onopen event listener
    ws.onopen = () => {
      console.log("connected websocket main component");

      setWs(ws);

      timeout = 250; // reset timer to 250 on open of websocket connection 
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    // websocket onclose event listener
    ws.onclose = e => {
      if (e.code === 1003) {

        ws.close();
        setWsError(true);
      } else {
        console.log(
          `Socket is closed. Reconnect will be attempted in ${Math.min(
            10000 / 1000,
            (timeout + timeout) / 1000
          )} second.`,
          e.reason
        );

        timeout = timeout + timeout; //increment retry interval
        connectInterval = setTimeout(check, Math.min(10000, timeout)); //call check function after timeout
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
      // this.props.addMessage(JSON.parse(message.data));
    }
  }

  const check = () => {
    const {ws} = this.state;
    if((!ws || ws.readyState === WebSocket.CLOSED) && !this.state.wsError) this.connect();
  };
  
  const sendMessage = (event) => {
    switch(event.which){
        case 13:
            event.preventDefault();                

            if(userMessage.trim() === ""){
                return;
            }                

            const obj = {
                roomid: 1,
                message: userMessage,
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

            props.addMessage({
                text: userMessage,
                author: props.user.username,
                created: date.getFullYear() + "-" + rep(date.getMonth()) + "-" + rep(date.getDate()) + " " + date.getHours() + ":" + date.getMinutes(),
            });
            // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

            setUserMessage("");
            return true;
        default:
            return false;
    }
  }

  const messageHandler = (event) => {
    setUserMessage(event.target.value);
  }

  const renderMessages = () => {
    let i = 0;
    let messageCount = props.messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = props.messages[i - 1];
      let current = props.messages[i];
      let next = props.messages[i + 1];
      let isMine = current.author === props.user.username;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

  return (
    <div className="message-list">
      <Toolbar
        title="Conversation Title"
        rightItems={[
          <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
          <ToolbarButton key="video" icon="ion-ios-videocam" />,
          <ToolbarButton key="phone" icon="ion-ios-call" />
        ]}
      />

      <div className="message-list-container">{renderMessages()}</div>
      <div ref={messagesEndRef} />

      <Compose
       onChange={messageHandler}
       onKeyDown={sendMessage}
       value={userMessage}
       rightItems={[
        <ToolbarButton key="photo" icon="ion-ios-camera" />,
        <ToolbarButton key="image" icon="ion-ios-image" />,
        <ToolbarButton key="audio" icon="ion-ios-mic" />,
        <ToolbarButton key="money" icon="ion-ios-card" />,
        <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
        <ToolbarButton key="emoji" icon="ion-ios-happy" />
      ]} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    messages: state.resources.messages,
    groups: state.resources.groups,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { addMessage, getMessages })(MessageList);