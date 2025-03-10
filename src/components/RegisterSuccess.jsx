import React from "react";
import successImg from "../assets/Clockify/Success.svg";
import closeImg from "../assets/Clockify/close.png";
import { useNavigate } from "react-router";

const RegisterSuccess = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    window.alert("Redirecting you to login page.");
    navigate("/login");
  };

  return (
    <>
      <div className="flex w-[100%] p-7 justify-end">
        <img
          onClick={handleRedirect}
          className="h-5 w-auto cursor-pointer"
          src={closeImg}
          alt=""
        />
      </div>
      <div className="flex flex-col items-center gap-5 p-7">
        <img
          className="mb-5 h-[10vh] w-auto pl-[0.5vw]"
          src={successImg}
          alt=""
        />
        <p className="text-[#233971] text-2xl text-center">Success</p>
        <p className="text-[#A7A6C5] text-md pb-14 text-center">
          Your account has been successed created.
        </p>
      </div>
    </>
  );
};

export default RegisterSuccess;
