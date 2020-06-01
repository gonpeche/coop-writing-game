import React from "react";
import { useSelector } from "react-redux";

const RoundResults = ({ nextRound, setShowResults, results }) => {
  const { roundResults, selections, winner } = useSelector((state) => state);

  const handleContinuar = () => {
    setShowResults(false);
    nextRound();
  };

  return (
    <div>
      {winner && "GANO !"}
      <div>
        {roundResults.ganador ? (
          <h1>Ganó {results.ganador.author}!</h1>
        ) : (
          <h1>Empate! Suman 1 punto los votados</h1>
        )}
      </div>
      <h2>Votados: </h2>
      {selections.map((votes, i) => {
        return (
          <p key={i}>
            {votes.voter} votó a {votes.name} el texto: "{votes.text}".
          </p>
        );
      })}
      <button className="submit-btn" onClick={handleContinuar}>
        Continuar
      </button>
    </div>
  );
};

export default RoundResults;
