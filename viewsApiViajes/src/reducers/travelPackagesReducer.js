export const travelPackagesReducer = (state = [], action) => {
  switch (action.type) {
    case "addPackage":
      return [
        ...state,
        {
          ...action.payload,
        },
      ];
    case "loadingPackages":
      return action.payload;
    default:
      return state;
  }
};
