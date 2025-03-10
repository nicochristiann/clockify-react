import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState({
    id: "",
    email: "",
    password: "",
  });

  const [user, setUser] = useState([
    { id: "1", email: "tes@gmail.com", password: "tes12345" },
    { id: "2", email: "admin@gmail.com", password: "admin123" },
  ]);

  const register = (email, password) => {
    setUser([...user, { id: user.length + 1, email, password }]);
  };

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
      value={{ currUser, setCurrUser, user, setUser, register, login }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
