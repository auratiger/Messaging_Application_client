import React, {useState} from 'react';
import ConversationList from './ConversationList/ConversationList';
import MessageList from './MessageList/MessageList';
import InformationList from './InformationList/InformationList';
import './ChatRoom.css';
import { Scrollbars } from 'react-custom-scrollbars';

export default function Messenger(props) {
    const [pocket, setPocket] = useState(false); 

    let comp = () => {
      if(pocket){
        return(
          <div className="sidebar">
            <InformationList/>
          </div>
        )
      }
    }

    return (
      <div className={pocket ? "messenger-right" : "messenger"}>
        <div className="sidebar">
          <Scrollbars 
                  autoHide
                  autoHideTimeout={1000}
                  autoHideDuration={200}
                  thumbSize={100}>
            <ConversationList />
          </Scrollbars>
        </div>

        <div className="content">
            <MessageList setPocket={() => {setPocket(!pocket)}}/>
        </div>

        {comp()}
      </div>
    );
}