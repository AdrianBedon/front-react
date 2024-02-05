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
    case "filterDate":
      return action.payload;
    case "filterPrice":
      return action.payload;
    case "filterCity":
      return action.payload;
    default:
      return state;
  }
};
