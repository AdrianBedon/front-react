import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./auth/KeycloakConfig.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ReactKeycloakProvider authClient={keycloak}>
      <App />
    </ReactKeycloakProvider>
  </BrowserRouter>
);
