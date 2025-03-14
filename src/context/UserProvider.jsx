import React, { createContext, useState, useEffect } from "react";
import Cookie from "js-cookie";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
    // const res = await fetch("http://localhost:8000/users", {
    try {
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
    } catch (error) {
      console.log("Error Register", error);
      setStatus("failed");
    }
    return;
  };

  // Login (set current user)
  const login = async (user) => {
    try {
      const res = await fetch(
        // diganti ke proxy nnti
        // `http://localhost:8000/users?email=${email}&password=${password}`,
        // `http://localhost:3000/api/v1/user/login`,
        `https://light-master-eagle.ngrok-free.app/api/v1/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );
      const data = await res.json();

      if (!data) return;

      // // Simpan token ke cookies (berlaku selama 1 hari)
      Cookie.set("token", data.token, { expires: 1 });
      console.log("Token :", Cookie.get("token"));

      // Simpan user ke localStorage
      localStorage.setItem("currUser", JSON.stringify(data.user));
      setCurrUser(data.user);
    } catch (error) {
      console.log("Error Fetching Data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ currUser, setCurrUser, users, setUsers, register, login }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
