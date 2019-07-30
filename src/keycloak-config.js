import Keycloak from 'keycloak-js';

console.log('configuring keycloak for auth server');
console.log(window._env_.SSO_URL);
export const keycloak = new Keycloak({
    "principal-attribute": "preferred_username",
    "realm": process.env.REACT_APP_RHSSO_REALM,
    "url":  window._env_.SSO_URL,
    "ssl-required": "external",
    "resource": process.env.REACT_APP_RHSSO_CLIENT,
    "public-client": true,
    "clientId": process.env.REACT_APP_RHSSO_CLIENT,
    "enable-cors": true
});
