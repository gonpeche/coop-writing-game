import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.scss";

const InputAnswer = ({ socket }) => {
  const { initGame, user } = useSelector((state) => state);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("receiveOtherAnswers", (answer) => {
      dispatch({ type: "add_answer", answer });
    });
  }, []);

  const submitAnswer = () => {
    const answer = {
      name: user.name,
      id: socket.id,
      text,
    };
    setAnswerSubmitted(true);
    dispatch({ type: "add_answer", answer });
    socket.emit("sendTextAnswer", answer);
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
