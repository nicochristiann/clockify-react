import React, { useState } from "react";
import logo from "../assets/Clockify/Logo.png";
import { Link } from "react-router";
import PasswordBox from "../components/PasswordBox";
import EmailBox from "../components/EmailBox";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {};
  return (
    <>
      <section>
        <div className="flex items-center justify-center h-[100vh]">
          <div className="flex flex-col items-center gap-[10vh]">
            <div>
              <img className="w-auto h-13" src={logo} alt="" />
            </div>
            <div>
              <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
                <EmailBox email={email} setEmail={setEmail} />
                <PasswordBox password={password} setPassword={setPassword} />

                {/* Forgot Password */}
                <div className="flex justify-end mb-1">
                  <Link
                    to="/"
                    className="underline text-gray-500 hover:text-white transition duration-120 ease-in"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In & Create */}
                <div className="flex flex-col items-center gap-5">
                  <button
                    className="bg-[#2EBED9] px-37 py-4 rounded-xl text-white cursor-pointer"
                    type="submit"
                  >
                    SIGN IN
                  </button>
                  <Link
                    to="/register"
                    className="underline text-white font-thin"
                  >
                    Create new account?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
