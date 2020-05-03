import React, { useEffect } from "react";
import "./index.scss";
import Chatbox from "./Chatbox";
import Mainboard from "./Mainboard";
import Onlinebox from "./Onlinebox";
import Scoreboard from "./Scoreboard";

function Gameboard({ socket }) {
  useEffect(() => {
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [socket]);
  return (
    <div className="gameboard-container">
      <header className="header">
        <Scoreboard />
      </header>
      <content className="content">
        <div className="online">
          <Onlinebox />
        </div>
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
