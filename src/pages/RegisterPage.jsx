import React from "react";
import logo from "../assets/Clockify/Logo.png";
import { Link } from "react-router";
import PasswordBox from "../components/PasswordBox";
import EmailBox from "../components/EmailBox";

const RegisterPage = () => {
  return (
    <>
      <section className="bg-[#25367B]">
        <div className="flex items-center justify-center h-[100vh]">
          <div className="flex flex-col items-center gap-[10vh]">
            <div>
              <img className="w-auto h-13" src={logo} alt="" />
            </div>
            <div>
              <form className="flex flex-col gap-10" action="">
                <EmailBox />
                <PasswordBox isConfirm={false} />
                <PasswordBox isConfirm={true} />

                {/* Create Account */}
                <div className="flex flex-col items-center gap-5 mt-10">
                  <button className="bg-[#2EBED9] px-20 py-3 rounded-xl text-white cursor-pointer">
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
