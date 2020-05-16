import React from "react";
import { useSelector } from "react-redux";

function Historia() {
  const { text } = useSelector((state) => state);
  return <div>{text}</div>;
}

export default Historia;
