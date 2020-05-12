import React, { useState } from "react";
import { useSelector } from "react-redux";

function Onlinebox({ socket }) {
  const { users } = useSelector((state) => state);
  const [score, setScore] = useState([]);

  socket.on("DATA_FROM_SERVER", (message) => {
    const { selections } = message;
    setScore(selections);
  });

  return (
    <div>
      Resultados
      <ul>
        {users.map((user, i) => (
          <li key={i}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Onlinebox;
