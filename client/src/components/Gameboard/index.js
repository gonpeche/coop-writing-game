import React from "react";
import "./index.scss";

function Gameboard() {
  return (
    <div className="gameboard-container">
      <header className="header">ACA VAN LOS PUNTAJES</header>
      <content className="content">
        <div className="online">ONLINE</div>
        <div className="gameboard">GAMEBOARD</div>
        <div className="chat">CHAT</div>
      </content>
    </div>
  );
}

export default Gameboard;
