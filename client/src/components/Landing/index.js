import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./index.scss";

function Landing({ socket }) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    socket.emit("join", { name }, (user) => {
      dispatch({ type: "add_user", name: user.name, id: user.id });
    });
  };

  return (
    <div>
      <h1>hola k ace!?</h1>
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
