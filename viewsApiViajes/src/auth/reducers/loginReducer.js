export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case "login":
      return {
        isAuth: true,
        isAdmin: action.payload.isAdmin,
        user: action.payload,
      };

    case "logout":
      return {
        isAuth: false,
        isAdmin: false,
        user: undefined,
      };

    default:
      return state;
  }
};
