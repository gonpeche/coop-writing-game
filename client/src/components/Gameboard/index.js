import React, { useEffect } from "react";
import "./index.scss";
import Chatbox from "./Chatbox";

function Gameboard({ socket }) {
  useEffect(() => {
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [socket]);
  return (
    <div className="gameboard-container">
      <header className="header">ACA VAN LOS PUNTAJES</header>
      <content className="content">
        <div className="online">ONLINE</div>
        <div className="gameboard">GAMEBOARD</div>
        <div className="chat">
          <Chatbox socket={socket} />
        </div>
      </content>
    </div>
  );
}

export default Gameboard;
