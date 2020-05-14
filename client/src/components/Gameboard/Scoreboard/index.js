import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Scoreboard({ socket }) {
  const { users, score } = useSelector((state) => state);
  // const [score, setScore] = useState([]);

  useEffect(() => {}, [score]);

  console.log("score", score);
  return (
    <div>
      Resultados
      <ul>
        {score.map((name, i) => (
          <li key={i}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Scoreboard;
