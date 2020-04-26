import React, { useEffect, useState } from "react";
import "./index.scss";

const Chatbox = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    // eslint-disable-next-line
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox">
        <ul>
          {messages.map((message) => {
            return <li>{message.text}</li>;
          })}
        </ul>
      </div>
      <div className="textbox">
        <form
          onSubmit={(event) => {
            sendMessage(event);
          }}
        >
          <input
            type="text"
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(event) =>
              event.key === "Enter" ? sendMessage(event) : null
            }
          ></input>
          <button type="submit">SEND</button>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
