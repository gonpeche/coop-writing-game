import React from "react";
import { useSelector } from "react-redux";

function Onlinebox() {
  const { users } = useSelector((state) => state);
  return (
    <div>
      <ul>
        {users.map((user, i) => (
          <li key={i}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Onlinebox;
