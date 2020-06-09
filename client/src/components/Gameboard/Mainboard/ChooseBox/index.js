import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { calculateRoundResults } from "../utils";
import PickAnswer from "../PickAnswer";
import RoundResults from "../RoundResults";
import "./index.scss";

Modal.setAppElement(document.getElementById("root"));

const customStyles = {
  overlay: {
    zIndex: 2,
    backgroundColor: "rgba(32, 29, 29, 0.75)",
  },
};

const ChooseBox = ({ socket, nextRound, openModal }) => {
  const { roundResults, selections } = useSelector((state) => state);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (roundResults?.votes) {
      const checkWinner = calculateRoundResults(selections);
      setResults(checkWinner);
      setShowResults(true);
    }
  }, [roundResults]);

  return (
    <div>
      <Modal
        isOpen={openModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        className="Modal"
      >
        {showResults ? (
          <RoundResults
            results={results}
            nextRound={nextRound}
            setShowResults={setShowResults}
          />
        ) : (
          <PickAnswer socket={socket} />
        )}
      </Modal>
    </div>
  );
};

export default ChooseBox;
