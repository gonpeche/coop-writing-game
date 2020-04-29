import React from "react";
import { useSelector } from "react-redux";

function Onlinebox() {
  const onlineUsers = useSelector((state) => state.users);
  return (
    <div>
      <ul>
        {onlineUsers.map((user, i) => (
          <li key={i}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Onlinebox;
