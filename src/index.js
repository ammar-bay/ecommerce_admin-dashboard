import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StoreProvider } from "../src/utils/Store";

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);
