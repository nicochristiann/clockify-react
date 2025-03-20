import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

function VerifyEmail() {
  const location = useLocation();
  const [isVerified, setisVerified] = useState("Verifying Your Email...");

  useEffect(() => {
    const handle = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const emailToken = params.get("emailToken");
        const res = await fetch(
          `https://f20d-103-19-109-29.ngrok-free.app/api/v1/user/verifyemail`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ emailToken }),
          }
        );

        const data = await res.json();

        if (data.status === "success") {
          setisVerified("Your Email Has Been Verified!");
        }
        // console.log(data.message);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    handle();
  }, []);

  return (
    <div className="flex w-[100vw] h-[100vh] justify-center items-center">
      <h1 className="text-white text-4xl">{isVerified}</h1>
    </div>
  );
}

export default VerifyEmail;
