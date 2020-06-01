import React from "react";
import { useSelector } from "react-redux";

const SelectAnswers = ({ handleSelect }) => {
  const { user, answers } = useSelector((state) => state);

  return (
    <div>
      {answers.map((answer, i) => {
        if (answer.name !== user.name) {
          return (
            <div key={i} onClick={() => handleSelect(answer)}>
              <label onClick={() => handleSelect(answer)}>
                <input
                  type="radio"
                  name="drone"
                  value={answer.text}
                  onChange={() => handleSelect(answer)}
                />
                {answer.text}
              </label>
            </div>
          );
        }
      })}
    </div>
  );
};

export default SelectAnswers;
