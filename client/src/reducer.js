/* eslint-disable */
import produce from "immer";

export const initialState = {
  user: {
    name: "",
    id: "",
  },
  admin: false,
  initGame: false,
  users: [],
  scores: [],
  answers: [],
  selections: [],
  text: "",
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
      draft.scores.push(action.score);
      return;
    case "set_selection":
      draft.selections.push(action.selected);
      return;
    case "add_answer":
      draft.answers.push(action.answer);
      return;
    case "add_text":
      draft.text = draft.text + action.text + " ";
      return;
    case "start_game":
      draft.answers = [];
      draft.selections = [];
      draft.initGame = true;
      return;
  }
});
