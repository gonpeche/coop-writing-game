const users = [];
let answers = [];
let selections = [];
let winners = [];

const addUser = ({ id, name }) => {
  name = name.trim().toLowerCase();

  const existingUser = users.find((user) => user.name === name);

  if (!name) return { error: "Name and room are required." };
  if (existingUser) return { error: "Ya hay otro con ese nombre" };

  const user = { id, name };

  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsers = () => users;

const addAnswer = (answer) => answers.push(answer);

const getAnswers = () => answers;

const emptyAnswers = () => (answers = []);

const getSelections = () => selections;

const setSelection = (selection) => selections.push(selection);

const emptySelections = () => (selections = []);

const getWinners = () => winners;

const setWinner = (winner) => winners.push(...winners, winner);

const emptyWinner = () => (winners = []);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsers,
  addAnswer,
  getAnswers,
  emptyAnswers,
  getSelections,
  emptySelections,
  setSelection,
  getWinners,
  setWinner,
  emptyWinner,
};
