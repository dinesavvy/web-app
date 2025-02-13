// src/index.js
import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import DistributorApp from "./App";

// Get the root element
const rootElement = document.getElementById("root");

// Create a root
const root = createRoot(rootElement);

// Render the app
root.render(<DistributorApp />);
