export const offsReducer = (state = [], action) => {
  switch (action.type) {
    case "loadingOffs":
      return action.payload;
    default:
      return state;
  }
};
