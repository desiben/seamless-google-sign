import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initGoogleAuth } from "./lib/google-auth";

// Initialize the native Google Auth plugin
initGoogleAuth();

createRoot(document.getElementById("root")!).render(<App />);

