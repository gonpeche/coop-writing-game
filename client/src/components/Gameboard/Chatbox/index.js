import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// import queryString from "querystring";
import io from "socket.io-client";

const ENDPOINT = "localhost:5000";
let socket;

const Chatbox = () => {
  const userName = useSelector((state) => state.userName);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", { userName });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [userName]);

  return (
    <div>
      <div id="message-container"></div>
      <form id="send-container">
        <input type="text" id="message-input"></input>
        <button type="submit" id="send-button">
          SEND
        </button>
      </form>
    </div>
  );
};

export default Chatbox;
