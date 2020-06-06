import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputAnswer from "./InputAnswer";
import ChooseBox from "./ChooseBox";
import { calculateRoundResults, calculateScore } from "./utils";
import actions from "../../../actions";

const Mainboard = ({ socket }) => {
  const [choseAnswers, setChoseAnswers] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { users, answers, selections, score, initGame } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  socket.on("startNextRound", () => {
    dispatch({ type: "next_round" });
    setChoseAnswers(false);
  });

  useEffect(() => {
    socket.on("receiveOthersSelections", (selected) => {
      dispatch({ type: "set_selection", selected });
    });
  }, []);

  useEffect(() => {
    socket.on("receiveOtherAnswers", (answer) => {
      dispatch({ type: "add_answer", answer });
    });
  }, []);

  useEffect(() => {
    if (users.length === answers.length && answers.length !== 0) {
      socket.emit("everyoneAnswered");
      setChoseAnswers(true);
    }
    if (selections.length === users.length && selections.length !== 0) {
      const roundResults = calculateRoundResults(selections);
      dispatch({ type: "set_round_results", roundResults });
      const newScore = calculateScore(roundResults, score);

      if (newScore.winnerText) {
        dispatch({ type: "add_text", text: newScore.winnerText });
      }

      dispatch(actions.updateScore(newScore, score));
    }
  }, [answers, selections]);

  socket.on("startPicking", () => {
    setOpenModal(true);
    setChoseAnswers(true);
  });

  const nextRound = () => {
    setChoseAnswers(false);
    dispatch({ type: "next_round" });
    socket.emit("nextRound");
  };
  return (
    <>
      {!choseAnswers ? (
        initGame ? (
          <InputAnswer socket={socket} />
        ) : (
          "Waiting for other players to join..."
        )
      ) : (
        <ChooseBox
          socket={socket}
          nextRound={nextRound}
          openModal={openModal}
        />
      )}
    </>
  );
};

export default Mainboard;
