import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://cloak.mindsoftdev.com:8443/",
  realm: "external",
  clientId: "react-frontend-viajes",
});

export default keycloak;
