import React from 'react';
import './Compose.css';

export default function Compose(props) {
    return (
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
          value={props.value}
          disabled={props.disabled}
        />

        {
          props.rightItems
        }
      </div>
    );
}