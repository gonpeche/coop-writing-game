import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./index.scss";

const SelectAnswers = ({ handleSelect }) => {
  const { user, answers } = useSelector((state) => state);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (answer) => {
    setSelectedOption(answer.name);
    handleSelect(answer);
  };

  return (
    <div className="select-answer">
      {answers.map((answer, i) => {
        if (answer.name !== user.name) {
          return (
            <div key={i} className="answer">
              <input
                type="radio"
                value={answer.text}
                onChange={() => handleOptionChange(answer)}
                checked={selectedOption === answer.name}
              />
              <label onClick={() => handleOptionChange(answer)}>
                <span>{answer.text}</span>
              </label>
            </div>
          );
        }
      })}
    </div>
  );
};

export default SelectAnswers;
