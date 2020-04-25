import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./index.scss";

function Landing() {
  const [userName, setUsername] = useState("");
  const [servidor, setServidor] = useState("");
  const dispatch = useDispatch();
  const callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    setServidor(body.express);
  };

  return (
    <div>
      <h1>hola k ace!?</h1>
      <p>RESPUESTA: {servidor}</p>
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
          callApi();
          // dispatch({ type: "set_username", userName });
        }}
      >
        A JUGAR
      </button>
    </div>
  );
}

export default Landing;
