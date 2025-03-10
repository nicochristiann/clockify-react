import React, { useState } from "react";
import logo from "../assets/Clockify/Logo.png";
import PasswordBox from "../components/PasswordBox";
import EmailBox from "../components/EmailBox";
import RegisterSuccess from "../components/RegisterSuccess";

const RegisterPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      {isRegister && (
        <div className="absolute z-20 h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)]">
          <div
            className={`absolute w-[35vw] top-[30vh] left-[32vw] flex flex-col items-center rounded-2xl bg-white`}
          >
            <RegisterSuccess />
          </div>
        </div>
      )}
      <section className="relative w-full justify-center items-center">
        <div className="flex items-center justify-center h-[100vh]">
          <div className="flex flex-col items-center gap-[10vh]">
            <div>
              <img className="w-auto h-13" src={logo} alt="Logo.png" />
            </div>
            <div>
              <form className="flex flex-col gap-10">
                <EmailBox email={email} setEmail={setEmail} />
                <PasswordBox
                  isConfirm={false}
                  password={password}
                  setPassword={setPassword}
                />
                <PasswordBox
                  isConfirm={true}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                />

                {/* Create Account */}
                <div className="flex flex-col items-center gap-5 mt-10">
                  <button
                    className="bg-[#2EBED9] px-20 py-3 rounded-xl text-white cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegister(true);
                    }}
                  >
                    CREATE YOUR ACCOUNT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
