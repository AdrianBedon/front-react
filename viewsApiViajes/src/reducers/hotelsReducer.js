export const hotelsReducer = (state = [], action) => {
  switch (action.type) {
    case "loadingHotels":
      return action.payload;
    case "filterHotels":
      return action.payload;
    default:
      return state;
  }
};
