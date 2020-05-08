import React, { useState, useEffect } from "react";
// import actions from "../../../actions";
import { useSelector, useDispatch } from "react-redux";
import "./index.scss";

const Mainboard = ({ socket }) => {
  const dispatch = useDispatch();
  const { admin, initGame, user } = useSelector((state) => state);
  const [text, setText] = useState("");
  const [answers, setAnswer] = useState([]);

  socket.on("start", () => dispatch({ type: "start_game" }));
  socket.on("text", () => setAnswer(answers));

  const submitAnswer = () => {
    const answer = {
      name: user.name,
      id: socket.id,
      text,
    };
    socket.emit("sendAnswer", answer, () => setText(""));
  };

  const handleStartGame = () => {
    socket.emit("startGame");
  };

  const handleOnKeyPress = (event) =>
    event.key === "Enter" ? submitAnswer() : null;

  return (
    <div>
      {admin && !initGame && (
        <button onClick={() => handleStartGame()}>Start</button>
      )}
      {initGame ? (
        <div>
          <h4>Escribí: </h4>
          <input
            onChange={(e) => setText(e.target.value)}
            className="input"
            autoFocus
            onKeyPress={handleOnKeyPress}
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
