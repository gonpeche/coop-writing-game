import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Onlinebox({ socket }) {
  const { users } = useSelector((state) => state);
  // const [score, setScore] = useState([]);

  useEffect(() => {
    socket.on("getWinners", (message) => {
      const { winners } = message;
    });
  }, []);

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
