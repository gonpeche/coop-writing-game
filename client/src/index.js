import React from "react";
import ReactDOM from "react-dom";
import { reducer } from "./reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./index.scss";
import App from "./components/App/index";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
