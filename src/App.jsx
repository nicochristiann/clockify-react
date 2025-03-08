import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import TimerPage from "./pages/TimerPage.jsx";
import ActivityPage from "./pages/ActivityPage.jsx";
import EditActivityPage from "./pages/EditActivityPage.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import ActivityProvider from "./context/ActivityProvider.jsx";

const App = () => {
  return (
    <ActivityProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route path="/timer" element={<TimerPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/edit-activity/:id" element={<EditActivityPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ActivityProvider>
  );
};

export default App;
