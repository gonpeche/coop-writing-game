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
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ChooseBox = ({ socket, nextRound, openModal }) => {
  const { roundResults, selections } = useSelector((state) => state);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  // const closeModal = () => {
  //   setIsOpen(false);
  // };

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
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={false}
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
