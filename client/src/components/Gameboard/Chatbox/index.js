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

  const sideBar = () => (
    <div>
      <div className="top-box-online">Amigos online:</div>
      {users.map((user, i) => (
        <div key={i}>
          {i + 1} - {user.name}
        </div>
      ))}
    </div>
  );

  const chatBox = () => (
    <div>
      <div className="chatbox">
        {messages.map((message, i) => {
          return (
            <div key={i} className="chatbox-messages">
              <span>
                <strong>{message.user}</strong>:{" "}
              </span>
              {message.text}
            </div>
          );
        })}
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

  return (
    <div className="chatbox-container">
      <div className="top-box">
        <div className="top-box-header">Chat</div>
      </div>
      <div className="bottom-box">
        <div className="sidebar">{sideBar()}</div>
        <div className="main-chatbox">{chatBox()}</div>
      </div>
    </div>
  );
};

export default Chatbox;
