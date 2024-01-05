export const peaksReducer = (state = [], action) => {
    switch (action.type) {
      case "loadingPeaks":
        return action.payload;
      default:
        return state;
    }
  };