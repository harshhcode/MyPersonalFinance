import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FinanceProvider } from "./context/FinanceContext";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FinanceProvider>
    <App />
  </FinanceProvider>
);
