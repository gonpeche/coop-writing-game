/* eslint-disable */
import produce from "immer";

export const initialState = {
  user: {
    name: "",
    id: "",
  },
  admin: false,
  initGame: false,
  id: "",
  users: [],
  score: [],
  playerTurn: {},
};

export const reducer = produce((draft = initialState, action) => {
  switch (action.type) {
    case "add_user":
      draft.user.name = action.name;
      draft.user.id = action.id;
      if (action.name.toLowerCase() === "gon") {
        draft.admin = true;
      }
      return draft;
    case "set_active_users":
      draft.users = action.users;
      return;
    case "set_score":
      console.log("reducer", action);
      draft.score.push(action.winner.name);
      return;
    case "start_game":
      draft.initGame = true;
      return;
  }
});
