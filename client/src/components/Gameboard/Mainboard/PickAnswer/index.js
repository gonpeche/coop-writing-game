import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectAnswers from "./SelectAnswers";
import "./index.scss";

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
    <div className="chooseContainer">
      <h2>Elegí el texto que más te guste: </h2>
      {!done ? (
        <>
          <div className="choseBox">
            <SelectAnswers handleSelect={handleSelect} />
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
};

export default PickAnswer;
