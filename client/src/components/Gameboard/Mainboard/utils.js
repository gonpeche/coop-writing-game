export const calculateRoundResults = (selections) => {
  let score = {};
  let winner = "";

  selections.forEach((selection) => {
    if (score[selection.text]) {
      score[selection.text] = {
        voters: [...score[selection.text].voters, selection.voter],
        count: (score[selection.text].count += 1),
        author: selection.name,
        ...score,
      };
    } else {
      score[selection.text] = {
        voters: [selection.voter],
        count: 1,
        author: selection.name,
        text: selection.text,
      };
    }
  });

  // Check if was a tie:
  let votes = [];
  for (let key of Object.keys(score)) {
    votes.push(score[key]["count"]);
  }

  let counter = 0;

  votes.forEach((vote) => {
    if (vote === Math.max(...votes)) {
      counter++;
    }
  });

  // finish checking. If there was a tie, count will be bigger than 1.
  //Else, theres a winner

  if (counter === 1) {
    const highest = Object.keys(score).reduce((a, b) =>
      score[a].count > score[b].count ? a : b
    );
    winner = highest;
  }

  // If there was a winner, get who was it:

  let response = {
    result: [score],
    ganador: winner
      ? {
          author: score[winner].author,
          text: winner,
          voters: score[winner].voters,
          count: score[winner].count,
        }
      : "",
    votes: selections,
  };

  return response;
};

export const calculateScore = (resultsVote) => {
  let response = {
    winner: "",
    winnerText: "",
    points: 0,
    votes: [],
  };
  if (resultsVote?.ganador) {
    response.winner = resultsVote?.ganador?.author;
    response.winnerText = resultsVote?.ganador?.text;
    response.points = 5;

    return response;
  } else {
    resultsVote.votes.map((vote) => {
      response.votes.push(vote.name);
    });
    return response;
  }
};
