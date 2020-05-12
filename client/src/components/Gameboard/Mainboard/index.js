import React, { useState } from "react";
import InputAnswer from "./InputAnswer";
import ChooseBox from "./ChooseBox";

const Mainboard = ({ socket }) => {
  const [choseAnswers, setChoseAnswers] = useState(false);
  const handleFinish = () => {
    setChoseAnswers(true);
    socket.emit("everyoneAnswered");
  };
  socket.on("startPicking", () => setChoseAnswers(true));

  return (
    <div>
      {!choseAnswers ? (
        <InputAnswer socket={socket} handleFinish={handleFinish} />
      ) : (
        <ChooseBox socket={socket} />
      )}
    </div>
  );
};

export default Mainboard;
