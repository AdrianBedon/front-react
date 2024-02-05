import { LoginPage } from "./auth/pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { useContext } from "react";
import { AuthContext } from "./auth/context/AuthContext";
import { CreateTravelPackageRoutes } from "./routes/CreateTravelPackageRoutes";
import { ReportRoutes } from "./routes/ReportRoutes";
import { TravelPackageRoutes } from "./routes/TravelPackageRoutes";

export const App = () => {
  const { login } = useContext(AuthContext);
  return (
    <Routes>
      {login.isAuth ? (
        <>
          <Route exact path="user/*" element={<UserRoutes />} />
          <Route exact path="hotel/*" element={<CreateTravelPackageRoutes />} />
          <Route exact path="report" element={<ReportRoutes />} />
          <Route exact path="tpackages/*" element={<TravelPackageRoutes />} />
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
