import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./redux/store";
import ErrorBoundry from "./components/error-boundry";
import {TestProvider} from './components/test-service-context';
import TestDataServices from "./services/test.services";

import "reset-css";

const testService = new TestDataServices();
ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <TestProvider value={testService}>
        <App />
      </TestProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);
