export const initialState = { name: "", id: "" };

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "add_user":
      return { name: action.name, id: action.id };
    default:
      return state;
  }
};
