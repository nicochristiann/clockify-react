import { useState, useEffect, useContext } from "react";
import { Navigate, Outlet } from "react-router";
import Cookie from "js-cookie";

const ProtectedRoute = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = Cookie.get("token");
    if (savedToken) {
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
