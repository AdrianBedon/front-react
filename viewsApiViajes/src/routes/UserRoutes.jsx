import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage";
import { Navbar } from "../components/layout/Navbar";
import { RegisterPage } from "../pages/RegisterPage";
import { UserProvider } from "../context/UserProvider";
import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";

export const UserRoutes = () => {
  const { login } = useContext(AuthContext);

  return (
    <>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<UsersPage />} />
          {!login.isAdmin || (
            <>
              <Route path="register" element={<RegisterPage />} />
              <Route path="edit/:id" element={<RegisterPage />} />
            </>
          )}
          <Route path="/" element={<Navigate to="/user" />} />
        </Routes>
      </UserProvider>
    </>
  );
};
