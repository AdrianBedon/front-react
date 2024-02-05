import { Navbar } from "../components/layout/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { PackagesPage } from "../pages/PackagesPage";
import { TravelPackageProvider } from "../context/TravelPackageProvider";

export const TravelPackageRoutes = () => {
  return (
    <>
      <TravelPackageProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<PackagesPage />} />
          <Route exact path="/" element={<Navigate to="tpackages" />} />
        </Routes>
      </TravelPackageProvider>
    </>
  );
};
