import React from "react";
import "./index.scss";
import Chatbox from "./Chatbox";

function Gameboard() {
  return (
    <div className="gameboard-container">
      <header className="header">ACA VAN LOS PUNTAJES</header>
      <content className="content">
        <div className="online">ONLINE</div>
        <div className="gameboard">GAMEBOARD</div>
        <div className="chat">
          <Chatbox />
        </div>
      </content>
    </div>
  );
}

export default Gameboard;
