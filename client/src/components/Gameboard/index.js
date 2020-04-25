import React from "react";
import { useSelector } from "react-redux";
import "./index.scss";

function Gameboard() {
  const name = useSelector((state) => state.userName);
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
