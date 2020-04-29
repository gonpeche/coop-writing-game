/* eslint-disable */
import produce from "immer";

export const initialState = {
  user: {
    name: "",
    id: "",
  },
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
      return draft;
    case "set_active_users":
      draft.users = action.users;
    // console.log("reducer", action.users);
    // draft.users.push(action.users);
    // console.log("hola", draft.users);
  }
});
