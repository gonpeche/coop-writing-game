import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectAnswers from "./SelectAnswers";
import "./index.scss";
import ok from "../../../../assets/ok.png";

const PickAnswer = ({ socket }) => {
  const { answers, user } = useSelector((state) => state);
  const [selected, setSelected] = useState([]);
  const [done, setDone] = useState(false);
  const dispatch = useDispatch();

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

  return (
    <div className="pick-answer-container">
      {!done ? (
        <>
          <div className="choseBox">
            <h2 className="choseBox-title">Elegí el texto que más te guste </h2>
            <SelectAnswers handleSelect={handleSelect} />
          </div>
          <div className="submit-button-wrapper">
            <button className="submit-button" onClick={() => submitSelection()}>
              ACEPTAR
            </button>
          </div>
        </>
      ) : (
        <div className="answer-submitted">
          <img src={ok} />
          <p>Waiting for the others to answer...</p>
        </div>
      )}
    </div>
  );
};

export default PickAnswer;
