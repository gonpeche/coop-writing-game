import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calculateWinner } from "./utils";

const ChooseBox = ({ socket }) => {
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [done, setDone] = useState(false);
  const { user, score } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit("getData");
    socket.on("DATA_FROM_SERVER", (payload) => {
      const { answers, selections } = payload;
      setAnswers(answers);
      if (answers.length === selections.length) {
        setShowResults(true);
        const winner = calculateWinner(selections);
        console.log("se encontro el ganador", winner);
        dispatch({ type: "set_score", winner: winner });
        // socket.emit("setWinner", winner);
      }
    });
  }, []);

  const handleSelect = (e) => {
    setSelected(e);
  };

  const submitSelection = () => {
    socket.emit("setSelection", selected);
    setDone(true);
    socket.emit("getData");
  };

  const choseAnswer = () => (
    <div>
      <h1>Elegí!</h1>
      {!done ? (
        <>
          <div>
            {answers.map((answer, i) => {
              // if (answer.name !== user.name) {
              return (
                <div key={i}>
                  <input
                    type="radio"
                    name="drone"
                    value={answer.text}
                    onChange={() => handleSelect(answer)}
                  />
                  <label>{answer.text}</label>
                </div>
              );
              // }
            })}
          </div>
          <button onClick={() => submitSelection()}>SUBMIT</button>
        </>
      ) : (
        <div>Esperando al resto...</div>
      )}
    </div>
  );

  return (
    <div>
      <div>
        {showResults ? <h2>GANÓ {score[score.length - 1]} </h2> : choseAnswer()}
      </div>
    </div>
  );
};

export default ChooseBox;
