import React, { createContext, useState, useEffect } from "react";
import Cookie from "js-cookie";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Register User
  const register = async ({ email, password, confirmPassword }, setStatus) => {
    // console.log(newUser);]
    try {
      const res = await fetch(
        "https://f20d-103-19-109-29.ngrok-free.app/api/v1/user/register",
        // "http://localhost:3000/api/v1/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, confirmPassword }),
        }
      );
      const data = await res.json();
      setStatus(data.status);
    } catch (error) {
      console.log("Error: ", error);
    }
    return;
  };

  // Login (set current user)
  const login = async (user) => {
    const res = await fetch(
      "https://f20d-103-19-109-29.ngrok-free.app/api/v1/user/login",
      // "http://localhost:3000/api/v1/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }
    );
    console.log(res);
    const data = await res.json();
    console.log(data);

    if (!data) return;

    // // Simpan token ke cookies (berlaku selama 1 hari)
    Cookie.set("token", data.token, { expires: 1 });
  };

  const forgotPassword = async (email) => {
    const res = await fetch(
      "https://f20d-103-19-109-29.ngrok-free.app/api/v1/user/forgotpassword",
      // "http://localhost:3000/api/v1/user/forgotpassword",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );
    const data = await res.json();
    console.log(data);
  };

  const resetPassword = async (resetToken, newPassword, confirmPassword) => {
    const res = await fetch(
      "https://f20d-103-19-109-29.ngrok-free.app/api/v1/user/resetpassword",
      // "http://localhost:3000/api/v1/user/resetpassword",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resetToken, newPassword, confirmPassword }),
      }
    );
    const data = await res.json();
    console.log(data);
    return;
  };

  return (
    <UserContext.Provider
      value={{
        register,
        login,
        resetPassword,
        forgotPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
