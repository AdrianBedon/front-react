import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
  isAuth: false,
  isAdmin: false,
  user: undefined,
};
export const useAuth = () => {
  const [login, dispatch] = useReducer(loginReducer, initialLogin);

  const navigate = useNavigate();

  const handlerLogin = async ({ username, password }) => {
    try {
      const response = await loginUser({ username, password });
      const token = response.data.token;
      const claims = JSON.parse(window.atob(token.split(".")[1]));
      const user = { username: claims.sub };
      console.log(claims);
      dispatch({
        type: "login",
        payload: { user, isAdmin: claims.isAdmin },
      });
      sessionStorage.setItem(
        "login",
        JSON.stringify({ isAuth: true, isAdmin: claims.isAdmin, user })
      );
      sessionStorage.setItem("token", `Bearer ${token}`);
      navigate("/user");
    } catch (error) {
      if (error.response?.status == 401) {
        Swal.fire("Login Error", "Username or password error", "error");
      } else if (error.response?.status == 403) {
        Swal.fire("Login Error", "You don't have access", "error");
      }
    }
  };

  const handlerLogout = () => {
    dispatch({
      type: "logout",
    });
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("token");
    sessionStorage.clear();
  };

  return {
    login,
    handlerLogin,
    handlerLogout,
  };
};
