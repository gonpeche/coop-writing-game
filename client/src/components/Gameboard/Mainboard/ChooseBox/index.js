import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calculateRoundResults } from "../utils";
import "./index.scss";

const ChooseBox = ({ socket, nextRound }) => {
  const { answers, roundResults, selections, user, winner } = useSelector(
    (state) => state
  );
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [done, setDone] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (roundResults?.votes) {
      const checkWinner = calculateRoundResults(selections);
      setResults(checkWinner);
      setShowResults(true);
    }
  }, [roundResults, showResults, winner]);

  const handleSelect = (e) => {
    setSelected(e);
  };

  const submitSelection = () => {
    const payload = {
      text: selected.text,
      name: selected.name,
      voter: user.name,
      id: selected.id,
    };

    if (payload.text) {
      dispatch({ type: "set_selection", selected: payload });
      socket.emit("sendSelection", payload);
      setDone(true);
    }
  };

  const handleContinuar = () => {
    setShowResults(false);
    setDone(false);
    nextRound();
  };

  const choseAnswer = () => (
    <div className="chooseContainer">
      <h1>Elegí!</h1>
      {!done ? (
        <>
          <div className="choseBox">
            {answers.map((answer, i) => {
              if (answer.name !== user.name) {
                return (
                  <div
                    key={i}
                    className="options"
                    onClick={() => handleSelect(answer)}
                  >
                    <label onClick={() => handleSelect(answer)}>
                      <input
                        type="radio"
                        name="drone"
                        value={answer.text}
                        onChange={() => handleSelect(answer)}
                      />
                      {answer.text}
                    </label>
                  </div>
                );
              }
            })}
          </div>
          <div className="submit-btn-wrapper">
            <button className="submit-btn" onClick={() => submitSelection()}>
              ACEPTAR
            </button>
          </div>
        </>
      ) : (
        <div>Esperando al resto...</div>
      )}
    </div>
  );

  const renderResults = () => (
    <div>
      <div>
        {roundResults.ganador ? (
          <h1>Ganó {results.ganador.author}!</h1>
        ) : (
          <h1>Empate! Suman 1 punto los votados</h1>
        )}
      </div>
      <h2>Votados: </h2>
      {selections.map((votes, i) => {
        return (
          <p key={i}>
            {votes.voter} votó a {votes.name} el texto: "{votes.text}".
          </p>
        );
      })}
      <button className="submit-btn" onClick={handleContinuar}>
        Continuar
      </button>
    </div>
  );

  return (
    <div>
      {winner ? (
        <h1>Ganó {winner}</h1>
      ) : (
        <div>{showResults ? renderResults() : choseAnswer()}</div>
      )}
    </div>
  );
};

export default ChooseBox;
