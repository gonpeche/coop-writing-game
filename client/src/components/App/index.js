import React from "react";
import { useSelector } from "react-redux";
import Landing from "../Landing";
import "./index.scss";
import Gameboard from "../Gameboard";
import io from "socket.io-client";

const ENDPOINT = "https://garralapala.herokuapp.com/";
// const ENDPOINT = "localhost:5000";
const socket = io(ENDPOINT);

function App() {
  const name = useSelector((state) => state);
  return (
    <div className="landing-container" id="snow">
      {name ? <Gameboard socket={socket} /> : <Landing socket={socket} />}
    </div>
  );
}

export default App;
