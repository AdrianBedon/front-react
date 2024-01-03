import { LoginPage } from "./auth/pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { useContext } from "react";
import { AuthContext } from "./auth/context/AuthContext";
import { TravelPackageRoutes } from "./routes/TravelPckageRoutes";

export const App = () => {
  const { login } = useContext(AuthContext);
  return (
    <Routes>
      {login.isAuth ? (
        <>
          <Route exact path="user/*" element={<UserRoutes />} />
          <Route exact path="hotel/*" element={<TravelPackageRoutes />} />
        </>
      ) : (
        <>
          <Route exact path="login" element={<LoginPage />} />
          <Route exact path="*" element={<Navigate to="login" />} />
        </>
      )}
    </Routes>
  );
};
