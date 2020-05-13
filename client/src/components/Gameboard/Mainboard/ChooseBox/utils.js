export const calculateWinner = (selections) => {
  let votes = [];
  let winner = [];
  selections.forEach((vote) => votes.push(vote.name));
  const mostVotedUser = getMax(votes);
  selections.forEach((user) => {
    if (user.name === mostVotedUser) {
      winner = user;
    }
  });
  return winner;
};

function getMax(votes) {
  let modeMap = {};
  let maxEl = votes[0],
    maxCount = 1;

  for (var i = 0; i < votes.length; i++) {
    var el = votes[i];

    if (modeMap[el] === null) {
      modeMap[el] = 1;
    } else {
      modeMap[el]++;
    }

    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }

  return maxEl;
}
