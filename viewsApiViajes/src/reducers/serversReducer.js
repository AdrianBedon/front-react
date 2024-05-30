export const serversReducer = (state = [], action) => {
    switch (action.type) {
      case "loadingServers":
        return action.payload;
      default:
        return state;
    }
  };