import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import TimerPage from "./pages/TimerPage.jsx";
import ActivityPage from "./pages/ActivityPage.jsx";
import EditActivityPage from "./pages/EditActivityPage.jsx";

// Add Activity

// Delete Activity

// Update Activity

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<App />}>
          <Route path="/timer" element={<TimerPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/edit-activity/:id" element={<EditActivityPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
