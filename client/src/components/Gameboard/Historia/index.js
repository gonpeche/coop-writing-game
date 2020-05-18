import React from "react";
import { useSelector } from "react-redux";

function Historia() {
  const { text } = useSelector((state) => state);
  return <div>{text ? text : "Acá se irá armando la historia..."}</div>;
}

export default Historia;
