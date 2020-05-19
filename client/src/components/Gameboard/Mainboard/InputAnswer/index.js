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
          <h4>Reglas:</h4>
          <p>
            Escribí el comienzo de una historia. Si tenes suerte, los otros
            participantes voten tu historia y quede seleccionada para formar un
            cuento.
          </p>
          <p>Si tu historia es votada por la mayoría, obtenes 5 puntos</p>
          <p>Si hay empate, todos los que tuvieron un voto sumara 1 punto</p>
          <p>El que llegue a 50 puntos, GANA!</p>
        </div>
      )}
    </div>
  );
};

export default InputAnswer;
