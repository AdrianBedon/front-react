  import { Navigate, Route, Routes } from "react-router-dom";
  import { CreatePackageProvider } from "../context/CreatePackageProvider";
  import { CreatePackagePage } from "../pages/CreatePackagePage";
  import { Navbar } from "../components/layout/Navbar";
  import { useContext } from "react";
  import { AuthContext } from "../auth/context/AuthContext";

  export const CreateTravelPackageRoutes = () => {
    const { login } = useContext(AuthContext);

    return (
      <>
        <CreatePackageProvider>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<CreatePackagePage />} />
            <Route exact path="/" element={<Navigate to="hotel" />} />
          </Routes>
        </CreatePackageProvider>
      </>
    );
  };
