import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./index.scss";
import Chatbox from "./Chatbox";
import Mainboard from "./Mainboard";
import Onlinebox from "./Onlinebox";
import Scoreboard from "./Scoreboard";

function Gameboard({ socket }) {
  const dispatch = useDispatch();

  socket.on("getUsers", (response) =>
    dispatch({ type: "set_active_users", users: response })
  );
  socket.on("startGame", () => {
    dispatch({ type: "start_game" });
  });

  useEffect(() => {
    socket.emit("joined", (response) => {
      dispatch({ type: "set_active_users", users: response });
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
    // eslint-disable-next-line
  }, [socket]);

  const restartGame = () => socket.emit("restart");
  const startGame = () => {
    dispatch({ type: "start_game" });
    socket.emit("startGame");
  };

  return (
    <div className="gameboard-container">
      <header className="header">
        <button onClick={() => startGame()}>start</button>
        <button onClick={() => restartGame()}>restart</button>
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
