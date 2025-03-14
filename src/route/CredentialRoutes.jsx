import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import Cookie from "js-cookie";

const CredentialRoute = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = Cookie.get("token");
    setToken(savedToken);
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  return token ? <Navigate to="/timer" /> : <Outlet />;
};

export default CredentialRoute;
