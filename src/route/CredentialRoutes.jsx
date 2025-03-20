import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import Cookie from "js-cookie";

const CredentialRoute = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = Cookie.get("token");
    if (savedToken) {
      setToken(savedToken);
    }
    setLoading(false);
  }, [token]);

  if (loading) return <p>Loading...</p>;
  // console.log(token);
  return token ? <Navigate to="/timer" /> : <Outlet />;
};

export default CredentialRoute;
