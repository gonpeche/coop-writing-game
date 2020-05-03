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
    socket.emit("join", { name }, callback);
  };

  return (
    <div>
      <h1>hola k ace!?</h1>
      <h1 style={{ color: "red" }}>{errorLogin}</h1>
      <h3>
        komo t yamas?
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? handleSubmit() : null
          }
        ></input>
      </h3>
      <button onClick={handleSubmit}>A JUGAR</button>
    </div>
  );
}

export default Landing;
