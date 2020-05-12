import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./index.scss";

const InputAnswer = ({ socket, handleFinish }) => {
  const { initGame, user } = useSelector((state) => state);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [text, setText] = useState("");

  const submitAnswer = () => {
    const answer = {
      name: user.name,
      id: socket.id,
      text,
    };
    const callback = (response) => {
      const { users, answers } = response;
      if (answers.length === users.length) {
        handleFinish(response);
      }
    };
    socket.emit("sendAnswer", answer, callback);
    setText("");
    setAnswerSubmitted(true);
    socket.emit("getData");
  };

  const handleOnKeyPress = (event) =>
    event.key === "Enter" ? submitAnswer() : null;

  const renderActionPanel = () => {
    return !answerSubmitted ? (
      <div>
        <h4>Escribí: </h4>
        <input
          onChange={(e) => setText(e.target.value)}
          className="input"
          autoFocus
          onKeyPress={handleOnKeyPress}
          value={text}
        ></input>
        <button onClick={submitAnswer}>Listo!</button>
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
        <h3>Wait of other players to join...</h3>
      )}
    </div>
  );
};

export default InputAnswer;
