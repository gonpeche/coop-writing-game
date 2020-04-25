import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./index.scss";

function Landing() {
  const [userName, setUsername] = useState("");
  const dispatch = useDispatch();

  return (
    <div>
      <h1>hola k ace!?</h1>
      <h3>
        komo t yamas?
        <input
          type="text"
          value={userName}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
      </h3>
      <button
        onClick={() => {
          dispatch({ type: "set_username", userName });
        }}
      >
        A JUGAR
      </button>
    </div>
  );
}

export default Landing;
