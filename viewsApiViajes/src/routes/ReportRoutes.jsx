import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { ReportProvider } from "../context/ReportProvider";
import { Navbar } from "../components/layout/Navbar";
import { Route, Routes } from "react-router-dom";
import { ReportPage } from "../pages/ReportPage";

export const ReportRoutes = () => {
  const { login } = useContext(AuthContext);

  return (
    <>
      <ReportProvider>
        <Navbar />
        <Routes>
          {!login.isAdmin || (
            <Route exact path="/" element={<ReportPage />} />
          )}
        </Routes>
      </ReportProvider>
    </>
  );
};
