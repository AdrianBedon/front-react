import { LoginPage } from "./auth/pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { CreateTravelPackageRoutes } from "./routes/CreateTravelPackageRoutes";
import { ReportRoutes } from "./routes/ReportRoutes";
import { TravelPackageRoutes } from "./routes/TravelPackageRoutes";
import { useKeycloak } from "@react-keycloak/web";

export const App = () => {
  const { keycloak, initialized } = useKeycloak();

  return (
    <Routes>
      <Route exact path="/user" element={<UserRoutes />} />
      <Route exact path="hotel/*" element={<CreateTravelPackageRoutes />} />
      <Route exact path="report" element={<ReportRoutes />} />
      <Route exact path="tpackages/*" element={<TravelPackageRoutes />} />
    </Routes>
  );
};
