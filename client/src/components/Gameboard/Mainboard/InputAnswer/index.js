import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./index.scss";

const InputAnswer = ({ socket, handleFinish }) => {
  const { initGame, user } = useSelector((state) => state);
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
  };

  useEffect(() => {
    console.log("init");
  }, [initGame]);

  const handleOnKeyPress = (event) =>
    event.key === "Enter" ? submitAnswer() : null;

  return (
    <div>
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

export default InputAnswer;
