import React, {useEffect} from 'react';
import shave from 'shave';

import './ConversationListItem.css';

export default function ConversationListItem(props) {
  useEffect(() => {
    shave('.conversation-snippet', 20);
  })

    const { image, name, text } = props.data;    

    return (
      <div className="conversation-list-item" onClick={() => {props.onClick(props.data)}}>
        <img className="conversation-photo" src={image} alt="conversation" />
        <div className="conversation-info">
          <h1 className="conversation-title">{ name }</h1>
          <p className="conversation-snippet">{ "Last Message: " + text }</p>
        </div>
      </div>
    );
}