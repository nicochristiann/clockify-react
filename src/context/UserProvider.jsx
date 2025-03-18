import React, { createContext, useState, useEffect } from "react";
import Cookie from "js-cookie";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const [loading, setLoading] = useState(true);
  const [currUser, setCurrUser] = useState({
    uuid: "",
    email: "",
  });

  useEffect(() => {
    const token = Cookie.get("token");
    const storedUser = localStorage.getItem("currUser");

    if (token && storedUser) {
      setCurrUser(JSON.parse(storedUser));
    } else {
      setCurrUser(null);
    }
  }, []);

  // Register User
  const register = async ({ email, password }, setStatus) => {
    // console.log(newUser);
    const res = await fetch(
      "https://light-master-eagle.ngrok-free.app/api/v1/user/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await res.json();
    setStatus(data.status);
    return;
  };

  // Login (set current user)
  const login = async (user) => {
    const res = await fetch(
      "https://light-master-eagle.ngrok-free.app/api/v1/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }
    );
    // Debugging
    console.log("Raw Response:", res);
    console.log("Status Response:", res.status);
    console.log("Header Response:", res.headers.get("content-type"));
    // console.log(res);
    const data = await res.json();
    // console.log(data);

    if (!data) return;

    // // Simpan token ke cookies (berlaku selama 1 hari)
    Cookie.set("token", data.token, { expires: 1 });

    // Simpan user ke localStorage
    localStorage.setItem("currUser", JSON.stringify(data.user));
    setCurrUser(data.user);
  };

  const forgotPassword = async (email) => {
    const res = await fetch(
      "https://light-master-eagle.ngrok-free.app/api/v1/user/forgotpassword",
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
      "https://light-master-eagle.ngrok-free.app/api/v1/user/resetpassword",
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
        currUser,
        setCurrUser,
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
