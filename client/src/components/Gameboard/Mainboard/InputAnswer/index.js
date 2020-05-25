import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.scss";

const InputAnswer = ({ socket }) => {
  const { initGame, user } = useSelector((state) => state);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const submitAnswer = () => {
    const answer = {
      name: user.name,
      id: socket.id,
      text,
    };

    if (answer.text) {
      setAnswerSubmitted(true);
      dispatch({ type: "add_answer", answer });
      socket.emit("sendTextAnswer", answer);
    }
  };

  const handleOnKeyPress = (event) =>
    event.key === "Enter" ? submitAnswer() : null;

  const renderActionPanel = () => {
    return !answerSubmitted ? (
      <div className="input-container">
        <h4>Escribí: </h4>
        <input
          onChange={(e) => setText(e.target.value)}
          className="input"
          autoFocus
          type="text"
          onKeyPress={handleOnKeyPress}
          value={text}
        ></input>
        <div>
          <button className="ready-btn" onClick={submitAnswer}>
            Listo!
          </button>
        </div>
      </div>
    ) : (
      <span>Listo! esperemos al resto...</span>
    );
  };
  return (
    <div>
      {initGame ? (
        renderActionPanel()
      ) : (
        <div>
          <h3>Wait of other players to join...</h3>
        </div>
      )}
    </div>
  );
};

export default InputAnswer;
