import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.scss";

const MAX_CHARACTERS = 140;

const InputAnswer = ({ socket }) => {
  const { user } = useSelector((state) => state);
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

  const textLength = () =>
    MAX_CHARACTERS - text.length < 40 ? "red" : "green";

  return answerSubmitted ? (
    "Esperemos al resto..."
  ) : (
    <div className="input-container">
      <textarea
        onChange={(e) => setText(e.target.value)}
        autofocus
        rows="4"
        cols="80"
        maxLength="140"
        placeholder="Start typing your story..."
        wrap="soft"
      ></textarea>
      <button onClick={submitAnswer}>Listo</button>
      <div className="remaining">
        <span>Remaining characters:</span>
        <span className={textLength()}>
          <strong>{MAX_CHARACTERS - text.length}</strong>
        </span>
      </div>
    </div>
  );
};

export default InputAnswer;
