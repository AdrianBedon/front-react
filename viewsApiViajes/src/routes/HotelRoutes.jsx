  import { Navigate, Route, Routes } from "react-router-dom";
  import { HotelProvider } from "../context/HotelProvider";
  import { HotelsPage } from "../pages/HotelsPage";
  import { Navbar } from "../components/layout/Navbar";
  import { useContext } from "react";
  import { AuthContext } from "../auth/context/AuthContext";

  export const HotelRoutes = () => {
    const { login } = useContext(AuthContext);

    return (
      <>
        <HotelProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HotelsPage />} />
            <Route path="/" element={<Navigate to="/hotel" />} />
          </Routes>
        </HotelProvider>
      </>
    );
  };
