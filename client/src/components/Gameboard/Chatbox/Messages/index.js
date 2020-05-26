import React from "react";
import "./index.scss";

const Messages = ({ messages }) => (
  <div className="chat-wrapper">
    <div className="chat-top">Chat</div>
    <div className="chat-bottom">
      <div>
        {messages.map((message, i) => {
          return (
            <div key={i} className="chat-bottom-message">
              <span>
                <strong>{message.user}</strong>:{" "}
              </span>
              {message.text}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default Messages;
