import React from "react";
import { useSelector } from "react-redux";

function Historia() {
  const { text } = useSelector((state) => state);
  return (
    <div>
      <div>{text ? text : "Acá se irá armando la historia..."}</div>
      <h4>Reglas:</h4>
      <p>
        Escribí el comienzo de una historia. Si tenes suerte, los otros
        participantes voten tu historia y quede seleccionada para formar un
        cuento.
      </p>
      <p>Si tu historia es votada por la mayoría, obtenes 5 puntos</p>
      <p>Si hay empate, todos los que tuvieron un voto sumara 1 punto</p>
      <p>El que llegue a 50 puntos, GANA!</p>
    </div>
  );
}

export default Historia;
