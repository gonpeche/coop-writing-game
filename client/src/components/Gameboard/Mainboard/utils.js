export const calculateWinner = (selections) => {
  let score = {};
  selections.forEach((selection) => {
    if (score[selection.text]) {
      score[selection.text] = {
        voters: [...score[selection.text].voters, selection.voter],
        count: (score[selection.text].count += 1),
      };
    } else {
      score[selection.text] = {
        voters: [selection.voter],
        count: 1,
      };
    }
  });

  let votes = [];
  for (let key of Object.keys(score)) {
    votes.push(score[key]["count"]);
  }

  const maxNumber = Math.max(...votes);

  let counter = 0;

  votes.forEach((vote) => {
    if (vote === maxNumber) {
      counter++;
    }
  });

  if (counter > 1) {
    console.log("empate!");
  } else {
    console.log("hay un ganador!");
  }
};
