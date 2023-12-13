import { LoginPage } from "./auth/pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { useContext } from "react";
import { AuthContext } from "./auth/context/AuthContext";
import { HotelRoutes } from "./routes/HotelRoutes";

export const App = () => {
  const { login } = useContext(AuthContext);
  return (
    <Routes>
      {login.isAuth ? (
        <>
          <Route path="user/*" element={<UserRoutes />} />
          <Route path="hotel/*" element={<HotelRoutes />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};
