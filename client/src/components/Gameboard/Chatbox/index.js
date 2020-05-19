import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./index.scss";

const Chatbox = ({ socket }) => {
  const { users } = useSelector((state) => state);
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
      <div>
        <div>Chatea con los participantes!</div>
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user.name}</li>
          ))}
        </ul>
      </div>
      <div className="chatbox">
        <ul className="chatbox-messages">
          {messages.map((message, i) => {
            return (
              <li key={i}>
                <span>{message.user}: </span>
                {message.text}
              </li>
            );
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
            value={message}
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
