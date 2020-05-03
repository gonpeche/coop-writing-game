import React from "react";
import { useSelector } from "react-redux";

function Scoreboard() {
  const { user } = useSelector((state) => state);
  return <div>Hola {user.name}!</div>;
}

export default Scoreboard;
