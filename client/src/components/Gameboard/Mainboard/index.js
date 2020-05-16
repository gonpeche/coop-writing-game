import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputAnswer from "./InputAnswer";
import ChooseBox from "./ChooseBox";
import { calculateWinner } from "./utils";

const Mainboard = ({ socket }) => {
  const [choseAnswers, setChoseAnswers] = useState(false);
  const { users, answers, selections } = useSelector((state) => state);
  const todo = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length === answers.length && answers.length !== 0) {
      socket.emit("everyoneAnswered");
      setChoseAnswers(true);
    }
    if (selections.length === users.length && selections.length !== 0) {
      const score = calculateWinner(selections);
      dispatch({ type: "set_score", score });
    }
  }, [answers, selections]);

  socket.on("startPicking", () => setChoseAnswers(true));

  const nextRound = () => {
    // dispatch({ type: "new_round" });
    setChoseAnswers(false);
    dispatch({ type: "start_game" });
    socket.emit("startGame");
  };

  return (
    <div>
      {!choseAnswers ? (
        <InputAnswer socket={socket} />
      ) : (
        <ChooseBox socket={socket} nextRound={nextRound} />
      )}
    </div>
  );
};

export default Mainboard;
