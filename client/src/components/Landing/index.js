import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./index.scss";

function Landing({ socket }) {
  const [name, setName] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const callback = (response) => {
      const { error } = response;
      if (error) setErrorLogin(error);

      const { name, id, users } = response;
      dispatch({ type: "add_user", name, id });
      dispatch({ type: "set_active_users", users });
    };
    if (name) {
      socket.emit("join", { name }, callback);
    }
  };

  return (
    <div className="welcome-landing">
      <h1>Bienvenido</h1>
      <h1 style={{ color: "red" }}>{errorLogin}</h1>
      <h2>¿Cual es tu nombre?</h2>
      <input
        type="text"
        autoFocus
        value={name}
        onChange={(event) => setName(event.target.value)}
        onKeyPress={(event) => (event.key === "Enter" ? handleSubmit() : null)}
      ></input>
      <div className="play-btn">
        <button onClick={handleSubmit}>A JUGAR</button>
      </div>
    </div>
  );
}

export default Landing;
