import React, { useState } from "react";
import InputAnswer from "./InputAnswer";

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
        <h1>Hola</h1>
      )}
    </div>
  );
};

export default Mainboard;
