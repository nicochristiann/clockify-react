import { useState, useEffect, useContext } from "react";
import { Navigate, Outlet } from "react-router";
import Cookie from "js-cookie";
import { UserContext } from "../context/UserProvider";

const ProtectedRoute = () => {
  const { setCurrUser } = useContext(UserContext);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = Cookie.get("token");
    setToken(savedToken);
    setLoading(false);
    // console.log(savedToken);
    setCurrUser(savedToken);
  }, []);

  if (loading) return <p>Loading...</p>;

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
