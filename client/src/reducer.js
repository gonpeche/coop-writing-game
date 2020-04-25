export const initialState = { userName: "" };

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "set_username":
      return { userName: action.userName };
    default:
      return state;
  }
};
