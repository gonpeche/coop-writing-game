import React from "react";
import ReactDOM from "react-dom";
import { reducer } from "./reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./index.scss";
import App from "./components/App/index";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
