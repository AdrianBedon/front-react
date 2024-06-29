import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import { useKeycloak } from "@react-keycloak/web";

export const Navbar = () => {
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    if (keycloak.authenticated) {
      sessionStorage.setItem("token", `Bearer ${keycloak.token}`);
      sessionStorage.setItem("refreshToken", keycloak.refreshToken);

      keycloak.onTokenExpired = () => {
        keycloak
          .updateToken(30)
          .then((refreshed) => {
            if (refreshed) {
              sessionStorage.setItem("token", `Bearer ${keycloak.token}`);
            } else {
              console.warn("Token not refreshed");
            }
          })
          .catch(() => {
            console.error("Failed to refresh token");
          });
      };
    }
  }, [keycloak]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark gradient">
      <div className="container-fluid">
        <a className="navbar-brand" href="">
          Travels App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item nav-item-p">
              <NavLink className="nav-link nav-link-p" to="/user">
                Usuarios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-p" to="/hotel">
                Crear paquete de viaje
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-p" to="/tpackages">
                Paquetes de viaje
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-p" to="/user/register">
                Registrar Usuario
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-p" to="/report">
                Reporte
              </NavLink>
            </li>
          </ul>
        </div>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavLogout"
        >
          {!keycloak.authenticated && (
            <button
              className="btn btn-outline-submit"
              onClick={() => keycloak.login()}
            >
              Log In
            </button>
          )}
          {!!keycloak.authenticated && (
            <>
              <span className="nav-item nav-item-p nav-link nav-link-p mx-3">
                Hola {keycloak.tokenParsed.preferred_username}
              </span>
              <button
                className="btn btn-outline-danger"
                onClick={keycloak.logout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
