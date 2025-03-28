import React, { useEffect, useState } from "react";
import logo from "../assets/Clockify/Logo.png";
import { Link } from "react-router";
import PasswordBox from "../components/PasswordBox";
import EmailBox from "../components/EmailBox";
import { useFormik } from "formik";
import { LoginSchema } from "../schema/UserSchema";
import { useNavigate } from "react-router";
import { login } from "../services/UserApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (values) => {
    const [errorMessage, res] = await login(values);
    if (res) {
      navigate("/timer");
    } else {
      setError(errorMessage);
      setIsError(true);
    }
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema: LoginSchema,
  });

  return (
    <>
      <section>
        <div className="flex items-center justify-center h-[100vh]">
          <div className="flex flex-col items-center gap-[10vh]">
            <div>
              <img className="w-auto h-13" src={logo} alt="" />
            </div>
            <div>
              <form className="flex flex-col gap-9" onSubmit={handleSubmit}>
                <div className="relative flex flex-col mb-5">
                  <EmailBox
                    email={values.email}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <label
                    htmlFor="email"
                    className="text-red-400 text-sm absolute top-11 left-12"
                  >
                    {errors.email}
                  </label>
                </div>
                <div className="relative flex flex-col mb-5">
                  <PasswordBox
                    password={values.password}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <label
                    htmlFor="password"
                    className="text-red-400 text-sm absolute top-11 left-12"
                  >
                    {errors.password}
                  </label>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end mb">
                  <Link
                    to="/forgot-password"
                    className="underline text-gray-500 hover:text-white transition duration-120 ease-in"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In & Create */}
                <div className="flex flex-col items-center gap-1">
                  {isError && (
                    <div className="flex items-center justify-center">
                      <span className="text-red-400 font-thin">{error}</span>
                    </div>
                  )}
                  <button
                    className="bg-[#2EBED9] px-37 py-4 rounded-xl text-white cursor-pointer mb-5"
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
