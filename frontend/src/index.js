// Entry point of the React app
import React from "react";
import ReactDOM from "react-dom/client";

// Import the main App component
import App from "./App";

// Create the root element (connects to <div id="root"> in index.html)
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
