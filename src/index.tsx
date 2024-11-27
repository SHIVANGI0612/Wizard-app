import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

const rootElement = document.getElementById("root") as HTMLElement;

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}