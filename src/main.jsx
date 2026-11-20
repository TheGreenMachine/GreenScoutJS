import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { applySavedTheme } from "./theme.js";
import "./index.css";

if (localStorage.getItem("app-theme") === null) {
  localStorage.setItem("app-theme", "Green");
}

applySavedTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
