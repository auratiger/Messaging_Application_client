import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import Compose from '../Compose/Compose';
import Toolbar from '../Toolbar/Toolbar';
import ToolbarButton from '../ToolbarButton/ToolbarButton';
import Message from '../Message/Message';
import moment from 'moment';

import { addMessage, getMessages } from '../../../store/actions/MessageHandling';
import { connectWS } from '../../../store/actions/WebSocket';

import './MessageList.css';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const MessageList = (props) => {
  const [userMessage, setUserMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const messagesEndRef = useRef(null)
  const classes = useStyles();

  useEffect(() => {
    props.getMessages(props.user, props.currentGroup.id).then(() => {
      setLoaded(true);
      props.connectWS(props.user.id);
    });    
  }, [])

  const autoscrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    autoscrollToBottom();
  })

  const sendMessage = (event) => {
    switch(event.which){
        case 13:
            event.preventDefault();                

            if(userMessage.trim() === ""){
                return;
            }                
            
            const obj = {
                roomid: props.currentGroup.id,
                message: userMessage,
            }
              
            try{
                props.ws.send(JSON.stringify(obj));    
            }catch(err){                    
                console.log(err);
            }

            let date = new Date();

            props.addMessage({
                text: userMessage,
                author: props.user.username,
                created: moment(date.getTime()).format("YYYY-MM-DD mm:ss"),
            });

            setUserMessage("");
            return true;
        default:
            return false;
    }
  }

  const messageHandler = (event) => {
    setUserMessage(event.target.value);
  }

  const handleToggle = () => {
    setLoaded(!loaded);
  };

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

      <Backdrop className={classes.backdrop} open={!loaded} onClick={handleToggle}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Toolbar
        title={props.currentGroup.name}
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
       disabled={props.currentGroup.id===0 ? true : false}
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
    messages: state.messages.messages,
    groups: state.groups.groups,
    currentGroup: state.groups.currentGroup,
    user: state.auth.user,
    ws: state.webSocket.ws,
  };
};

export default connect(mapStateToProps, { addMessage, getMessages, connectWS})(MessageList);