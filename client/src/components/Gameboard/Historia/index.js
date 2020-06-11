import React from "react";
import { useSelector } from "react-redux";
import "./index.scss";

function Historia() {
  const { text } = useSelector((state) => state);
  return (
    <div className="historia">
      {text ? (
        <div>
          <h4>TEXTO:</h4>
          <p className="texto">{text}</p>
        </div>
      ) : (
        <div className="rules">
          <h3>REGLAS</h3>
          <p>
            Escribí el comienzo de una historia. Si tenes suerte, los otros
            participantes podrán votar tu historia y así pueda quedar
            seleccionada para formar parte de una historia contada por todos.
          </p>
          <h4>PUNTAJE</h4>
          <p>Si tu historia es votada por la mayoría, obtendras 5 puntos</p>
          <p>Si hay empate, todos los que tuvieron un voto sumarán 1 punto</p>
          <p>
            El que llegue a <strong>25 PUNTOS</strong> GANA!
          </p>
        </div>
      )}
    </div>
  );
}

export default Historia;
