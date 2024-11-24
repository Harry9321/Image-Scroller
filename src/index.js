import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";


// Create the root element
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);