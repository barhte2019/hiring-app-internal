import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
    "principal-attribute": "preferred_username",
    "realm": "kie-realm",
    "url": "http://localhost:8080/auth",
    "ssl-required": "external",
    "resource": "reactapp",
    "public-client": true,
    "clientId": "reactapp",
    "enable-cors": true
});
