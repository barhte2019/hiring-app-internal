import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import "@patternfly/react-core/dist/styles/base.css";

import configureStore from './store';
import AppContainer from '@app/index';

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  // tslint:disable-next-line
  const axe = require("react-axe");
  axe(React, ReactDOM, 1000);
}

const Root = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root") as HTMLElement);
