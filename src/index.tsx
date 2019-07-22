import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import "@patternfly/react-core/dist/styles/base.css";

import { KeycloakProvider } from 'react-keycloak';

import configureStore, { history } from './store';
import AppContainer from '@app/index';
import { ConnectedRouter } from "connected-react-router";
import { keycloak } from './keycloak-config';

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  // tslint:disable-next-line
  const axe = require("react-axe");
  axe(React, ReactDOM, 1000);
}

const tokens = JSON.parse(localStorage.getItem('kcTokens') || '{}');

function onKeycloakTokens(tks) {
  localStorage.setItem('kcTokens', JSON.stringify(tks));
  store.dispatch({ type: "UPDATE_TOKEN", token: tks.token });
  setInterval(() => {
    keycloak.updateToken(10).error(() => keycloak.logout());
  }, 10000);
}

function onKeycloakEvent(event, error) {
  if (event === 'onAuthLogout') {
    localStorage.removeItem('kcTokens');
    store.dispatch({ type: "UPDATE_TOKEN", token: '' });
  }
}


const Root = () => (
  <KeycloakProvider
    keycloak={keycloak}
    initConfig={{ onLoad: 'check-sso', ...tokens }}
    onEvent={onKeycloakEvent}
    onTokens={onKeycloakTokens}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppContainer />
      </ConnectedRouter>
    </Provider>
  </KeycloakProvider>
);

ReactDOM.render(<Root />, document.getElementById("root") as HTMLElement);
