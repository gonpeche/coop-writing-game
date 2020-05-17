import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Scoreboard({ socket }) {
  // const { score } = useSelector((state) => state);

  // useEffect(() => {
  //   if (score.length) {
  //     createScoreboard(scores);
  //   }
  // }, [score]);

  const createScoreboard = (scores) => {
    // const board = {};
    // scores.forEach((score) => {
    //   if (board[score.name]) {
    //     board[score.name] += 1;
    //   } else {
    //     board[score.name] = 1;
    //   }
    // });
    // setScoreboard([board]);
  };

  return (
    <div>
      Resultados
      {/* <ul>
        {scoreBoard.length &&
          scoreBoard.map((score, i) => <li key={i}>{score.name}</li>)}
      </ul> */}
    </div>
  );
}

export default Scoreboard;
