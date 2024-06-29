import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage";
import { Navbar } from "../components/layout/Navbar";
import { RegisterPage } from "../pages/RegisterPage";
import { UserProvider } from "../context/UserProvider";
import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";

export const UserRoutes = () => {
  //const { login } = useContext(AuthContext);

  return (
    <>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<UsersPage />} />
          <Route exact path="register" element={<RegisterPage />} />
          <Route exact path="edit/:id" element={<RegisterPage />} />
          <Route exact path="/" element={<Navigate to="user" />} />
        </Routes>
      </UserProvider>
    </>
  );
};
