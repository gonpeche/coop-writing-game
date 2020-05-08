import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./index.scss";
import Chatbox from "./Chatbox";
import Mainboard from "./Mainboard";
import Onlinebox from "./Onlinebox";
import Scoreboard from "./Scoreboard";

function Gameboard({ socket }) {
  const dispatch = useDispatch();

  socket.on("gato", (response) =>
    dispatch({ type: "set_active_users", users: response })
  );

  useEffect(() => {
    socket.emit("joined", (response) => {
      dispatch({ type: "set_active_users", users: response });
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [socket]);

  return (
    <div className="gameboard-container">
      <header className="header">
        <Scoreboard socket={socket} />
      </header>
      <content className="content">
        <div className="online">
          <Onlinebox socket={socket} />
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
