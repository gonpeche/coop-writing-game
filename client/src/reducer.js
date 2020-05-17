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
  score: {},
  answers: [],
  selections: [],
  roundResults: [],
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
    case "update_score":
      draft.score = action.updatedScore;
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
    case "set_round_results":
      draft.roundResults = action.roundResults;
      return;
    case "start_game":
      draft.initGame = true;
      return;
    case "next_round":
      draft.answers = [];
      draft.selections = [];
      draft.initGame = true;
      draft.roundResults = [];
      return;
  }
});
