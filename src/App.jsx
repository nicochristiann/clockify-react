import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import TimerPage from "./pages/TimerPage.jsx";
import ActivityPage from "./pages/ActivityPage.jsx";
import EditActivityPage from "./pages/EditActivityPage.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import CredentialRoute from "./route/CredentialRoutes.jsx";
import ProtectedRoute from "./route/ProtectedRoutes.jsx";
import Cookie from "js-cookie";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";

const App = () => {
  useEffect(() => {
    const token = Cookie.get("token"); // Ambil token dari cookie
    !token && localStorage.removeItem("currUser"); // Hapus localStorage jika cookie tidak ada
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman yang bisa diakses jika tidak login */}
        <Route element={<CredentialRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* Halaman yang bisa diakses jika login */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="/timer" element={<TimerPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/edit-activity/:id" element={<EditActivityPage />} />
          </Route>
        </Route>

        {/* Halaman Error */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
