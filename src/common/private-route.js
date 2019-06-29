import { Component } from "react";
import { useKeycloak } from 'react-keycloak';
import { Redirect } from "react-router";

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const [keycloak] = useKeycloak();
    <Route {...rest} render={(props) => (
        keycloak.authenticated
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
}