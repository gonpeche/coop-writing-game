import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RoundResults = ({ nextRound, setShowResults, results }) => {
  const { roundResults, selections, winner } = useSelector((state) => state);
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      setShowResults(false);
      nextRound();
    }
  }, [counter]);

  return (
    <div>
      {winner ? (
        `GANO ${winner}`
      ) : (
        <>
          <div>
            {roundResults.ganador ? (
              <h1>Ganó {results.ganador.author}!</h1>
            ) : (
              <h1>Empate! Suman 1 punto los votados</h1>
            )}
          </div>
          <h2>Votados: </h2>

          {Object.entries(roundResults.result[0]).map(([key, value]) => (
            <div>
              <h4>"{key}"</h4>
              <p>
                Votado por:
                {value["voters"].map((vote) => (
                  <span>{vote} </span>
                ))}
              </p>
            </div>
          ))}
          <h2>Next round in: {counter}</h2>
        </>
      )}
    </div>
  );
};

export default RoundResults;
