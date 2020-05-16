import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { calculateMostVoted } from "../utils";

const ChooseBox = ({ socket, nextRound }) => {
  const { answers, scores, selections, user } = useSelector((state) => state);
  const [selected, setSelected] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [done, setDone] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("receiveOthersSelections", (selected) => {
      dispatch({ type: "set_selection", selected });
    });

    if (scores.length) {
      // const winners = calculateMostVoted(selections);
      // console.log(winners);
      setShowResults(true);
    }
  }, [scores, showResults]);

  const handleSelect = (e) => {
    setSelected(e);
  };

  const submitSelection = () => {
    setDone(true);
    const payload = {
      text: selected.text,
      name: selected.name,
      voter: user.name,
      id: selected.id,
    };
    dispatch({ type: "set_selection", selected: payload });
    socket.emit("sendSelection", payload);
  };

  const choseAnswer = () => (
    <div>
      <h1>Elegí!</h1>
      {!done ? (
        <>
          <div>
            {answers.map((answer, i) => {
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
        {showResults ? (
          <div>
            <h2>Votados: </h2>
            {selections.map((selection, i) => {
              return (
                <p key={i}>
                  "{selection.text}" de {selection.name}
                </p>
              );
            })}
            <button onClick={nextRound}>Continuar</button>
          </div>
        ) : (
          choseAnswer()
        )}
      </div>
    </div>
  );
};

export default ChooseBox;
