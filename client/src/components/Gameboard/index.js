import React, { useEffect } from "react";
import "./index.scss";
import Chatbox from "./Chatbox";
import Mainboard from "./Mainboard";

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
        <div className="gameboard">
          <Mainboard socket={socket} />
        </div>
        <div className="chat">
          <Chatbox socket={socket} />
        </div>
      </content>
    </div>
  );
}

export default Gameboard;
