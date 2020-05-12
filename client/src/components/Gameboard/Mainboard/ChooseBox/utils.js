export const calculateWinner = (selections) => {
  let votes = [];
  selections.forEach((vote) => votes.push(vote.name));
  console.log(votes);
};
