import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { verifyEmail } from "../services/UserApi";

const VerifyEmailPage = () => {
  const location = useLocation();
  const [isVerified, setIsVerified] = useState("Verifying Your Email...");

  useEffect(() => {
    verifyEmail(location, setIsVerified);
  }, []);

  return (
    <div className="flex w-[100vw] h-[100vh] justify-center items-center">
      <h1 className="text-white text-4xl">{isVerified}</h1>
    </div>
  );
};

export default VerifyEmailPage;
