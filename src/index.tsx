import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import store from "./redux/store";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import "./styles/index.scss";
import "./firebase";

const root = createRoot(document.getElementById("root"));

serviceWorkerRegistration.unregister();
reportWebVitals();

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
