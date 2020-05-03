import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.scss";

const Mainboard = ({ socket }) => {
  const dispatch = useDispatch();
  const { admin, initGame } = useSelector((state) => state);
  const [answer, setAnswer] = useState("");
  // const [start, setStart] = useState(false);
  const submitAnswer = () => {
    console.log(answer);
  };
  const handleStartGame = () => {
    socket.emit("startGame");
  };
  useEffect(() => {
    socket.on("letsBegin", () => {
      dispatch({ type: "start_game" });
    });
    // eslint-disable-next-line
  }, [initGame]);
  return (
    <div>
      {admin && !initGame && (
        <button onClick={() => handleStartGame()}>Start</button>
      )}
      {initGame ? (
        <div>
          <h4>Escribí: </h4>
          <input
            onChange={(e) => setAnswer(e.target.value)}
            className="input"
          ></input>
          <button onClick={submitAnswer}>Listo!</button>
        </div>
      ) : (
        <h3>Wait of other players to join...</h3>
      )}
    </div>
  );
};

export default Mainboard;
