const submitAnswer = (payload) => {
  return {
    type: "set_answer",
    payload,
  };
};

const updateScore = (newScore, actualScore) => {
  let updatedScore = Object.assign({}, actualScore);

  if (newScore.winner) {
    if (updatedScore[newScore.winner]) {
      updatedScore[newScore.winner] += 5;
    } else {
      updatedScore[newScore.winner] = 5;
    }
  } else {
    newScore.votes.forEach((user) => {
      if (updatedScore[user]) {
        updatedScore[user] += 1;
      } else {
        updatedScore[user] = 1;
      }
    });
  }

  return {
    type: "update_score",
    updatedScore,
  };
};

export default { submitAnswer, updateScore };
