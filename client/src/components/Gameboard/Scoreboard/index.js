import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function Scoreboard({}) {
  const { score, users } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [board, setBoard] = useState([]);

  useEffect(() => {
    createScoreboard();
  }, [score]);

  const createScoreboard = () => {
    let updatedBoard = [];
    users.forEach((user) => {
      let userData = {};
      if (score[user.name]) {
        userData.name = user.name;
        userData.score = score[user.name];
        updatedBoard.push(userData);
      } else {
        userData.name = user.name;
        userData.score = 0;
        updatedBoard.push(userData);
      }
      score[user.name] >= 5 &&
        dispatch({ type: "set_winner", winner: user.name });
    });
    setBoard(updatedBoard);
  };

  const renderTableData = () => {
    return board.map((user, i) => {
      const { name, score } = user;
      return (
        <tr key={i}>
          <td>{name}</td>
          <td>{score}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      Resultados:
      <table id="students">
        <tbody>{renderTableData()}</tbody>
      </table>
    </div>
  );
}

export default Scoreboard;
