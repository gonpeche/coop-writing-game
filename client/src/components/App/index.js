import React from "react";
import { useSelector } from "react-redux";
import Landing from "../Landing";
import "./index.scss";
import Gameboard from "../Gameboard";

function App() {
  const userName = useSelector((state) => state.userName);
  return (
    <div className="landing-container" id="snow">
      {userName ? <Gameboard /> : <Landing />}
    </div>
  );
}

export default App;
