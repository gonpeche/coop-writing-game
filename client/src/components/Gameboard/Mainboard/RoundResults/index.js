import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./index.scss";

const RoundResults = ({ nextRound, setShowResults, results }) => {
  const { roundResults, winner } = useSelector((state) => state);
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
    <div className="roundResults-wrapper">
      {winner ? (
        <h1 className="winner-message">
          GANO {winner.toUpperCase()} - Game ending in... {counter}
        </h1>
      ) : (
        <>
          <div className="roundResults-wrapper-header">
            {roundResults.ganador ? (
              <div>Ganó {results.ganador.author}!</div>
            ) : (
              <div>
                <strong className="author">¡Empate!</strong> Suman 1 punto los
                que fueron votados:
              </div>
            )}
          </div>
          <div className="roundResults-wrapper-body">
            {roundResults?.result &&
              Object.entries(roundResults.result[0]).map(([key, value]) => (
                <div className="roundResults-wrapper-answer">
                  <div className="roundResults-wrapper-answer-top">"{key}"</div>
                  <p>
                    <strong>
                      Escrito por{" "}
                      <span className="author">
                        {value.author.toUpperCase()}
                      </span>{" "}
                      y votado por:{" "}
                    </strong>
                    {value["voters"].map((vote) => (
                      <span>{vote.toUpperCase()} </span>
                    ))}
                  </p>
                </div>
              ))}
          </div>
          <div className="roundResults-wrapper-footer">
            <strong>NEXT ROUND IN {counter}</strong>
          </div>
        </>
      )}
    </div>
  );
};

export default RoundResults;
