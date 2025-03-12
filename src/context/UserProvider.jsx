import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currUser, setCurrUser] = useState({
    id: "",
    email: "",
    password: "",
    verified: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8000/users");
        const data = await res.json();

        // Konversi format String di JSON ke Date
        const formattedData = data.map((user) => ({
          ...user,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        }));

        setUsers(formattedData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Register User
  const register = async (newUser) => {
    const res = await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    return;
  };

  // Login (set current user)
  const login = (email, password) => {
    const findUser = user.find(
      (item) => item.email === email && item.password === password
    );
    if (findUser) {
      setCurrUser(findUser);
      return true;
    }
    return false;
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
