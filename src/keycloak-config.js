import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
    "principal-attribute": "preferred_username",
    "realm": process.env.REACT_APP_RHSSO_REALM,
    "url": process.env.REACT_APP_RHSSO_URL,
    "ssl-required": "external",
    "resource": process.env.REACT_APP_RHSSO_CLIENT,
    "public-client": true,
    "clientId": process.env.REACT_APP_RHSSO_CLIENT,
    "enable-cors": true
});
