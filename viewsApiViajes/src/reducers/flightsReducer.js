export const flightsReducer = (state = [], action) => {
  switch (action.type) {
    case "loadingFlights":
      return action.payload;
    case "filterFlights":
      return action.payload;
    default:
      return state;
  }
};
