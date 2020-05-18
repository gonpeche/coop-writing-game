import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import Chatbox from "./Chatbox";
import Mainboard from "./Mainboard";
import Scoreboard from "./Scoreboard";
import Historia from "./Historia";

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
  }, []);

  const startGame = () => {
    dispatch({ type: "start_game" });
    socket.emit("startGame");
  };

  return (
    <div className="gameboard-container">
      <div className="board-wrapper">
        <header className="header">
          <Historia socket={socket} />
        </header>
        <div className="content">
          <div className="scores">
            <button onClick={() => startGame()}>start</button>
            <Scoreboard socket={socket} />
          </div>
          <div className="gameboard">
            <Mainboard socket={socket} />
          </div>
          <div className="chat">
            <Chatbox socket={socket} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gameboard;
