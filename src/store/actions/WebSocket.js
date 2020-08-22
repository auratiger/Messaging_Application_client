import {CREATE_CONNECTION, CLOSE_CONNECTION} from './actionTypes';
import {addMessage} from './MessageHandling';
import {updateLastMessage} from './GroupHandling';

var timeout = 250;
var ws;

export const connectWS = (id) => dispatch => {
  
    ws = new WebSocket("ws://localhost:8080/ChatRoom/chat/" + id);
    var connectInterval;

    // websocket onopen event listener
    ws.onopen = () => {
      console.log("connected websocket main component");

      timeout = 250; // reset timer to 250 on open of websocket connection 
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    // websocket onclose event listener
    ws.onclose = e => {
      if (e.code === 1003) {

        ws.close();
      } else {
        console.log(
          `Socket is closed. Reconnect will be attempted in ${Math.min(
            10000 / 1000,
            (timeout + timeout) / 1000
          )} second.`,
          e.reason
        );

        timeout = timeout + timeout; //increment retry interval
        connectInterval = setTimeout(check(id, dispatch), Math.min(10000, timeout)); //call check function after timeout
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
      dispatch(closeWebSocket());
    };

    ws.onmessage = message => {
      let jsonMessage = JSON.parse(message.data);
      dispatch(addMessage(jsonMessage));
      dispatch(updateLastMessage({id: jsonMessage.roomid, text: jsonMessage.text}));
    }

    dispatch(setWebSocket(ws));
}

const setWebSocket = ws => {
    return {
        type: CREATE_CONNECTION,
        payload: ws,
    }
}

export const closeWebSocket = () => {
    return{
        type: CLOSE_CONNECTION,
    }
}

const check = (id, dispatch) => {
    if((!ws || ws.readyState === WebSocket.CLOSED)) dispatch(connectWS(id));
};
