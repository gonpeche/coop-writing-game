import React, { useEffect, useState } from "react";
import Input from "./Input";
import Messages from "./Messages";
import "./index.scss";

const Chatbox = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="chat-container">
      <Messages messages={messages} />
      <Input socket={socket} />
    </div>
  );
};

export default Chatbox;
