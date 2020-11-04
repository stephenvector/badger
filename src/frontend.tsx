import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import AppDataProvider from "./providers/AppDataProvider";

ReactDOM.hydrate(
  <BrowserRouter>
    <AppDataProvider>
      <App />
    </AppDataProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
