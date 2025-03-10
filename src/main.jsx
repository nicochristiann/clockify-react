import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ActivityProvider from "./context/ActivityProvider.jsx";
import TimerProvider from "./context/TimerProvider.jsx";
import UserProvider from "./context/UserProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ActivityProvider>
        <TimerProvider>
          <App />
        </TimerProvider>
      </ActivityProvider>
    </UserProvider>
  </StrictMode>
);
