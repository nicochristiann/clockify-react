import React, { useState, useEffect } from "react";
import logo from "../assets/Clockify/Logo.png";
import PasswordBox from "../components/PasswordBox";
import EmailBox from "../components/EmailBox";
import RegisterSuccess from "../components/RegisterSuccess";
import { useFormik } from "formik";
import { RegisterSchema } from "../schema/UserSchema";
import { register } from "../services/UserApi";

const RegisterPage = () => {
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    if (status === "success") {
      setTimeout(() => {
        setIsRegister(true);
      }, 600);
    }
  }, [status]);

  const handleRegister = async (values) => {
    const [errorMessage, res] = await register(values, setStatus);
    if (!res) {
      setError(errorMessage);
      setIsError(true);
    }
  };

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: handleRegister,
    validationSchema: RegisterSchema,
  });

  return (
    <>
      {isRegister && (
        <div className="absolute z-20 h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)]">
          <div
            className={`absolute w-[40vw] top-[30vh] left-[30vw] flex flex-col items-center rounded-2xl bg-white transition-all duration-200 transform ${
              isRegister ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
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
              <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
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
                    isConfirm={false}
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
                <div className="relative flex flex-col mb-5">
                  <PasswordBox
                    isConfirm={true}
                    confirmPassword={values.confirmPassword}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="text-red-400 text-sm absolute top-11 left-12"
                  >
                    {errors.confirmPassword}
                  </label>
                </div>

                <div className="flex flex-col items-center gap-5 mt-10">
                  {isError && (
                    <div className="flex items-center justify-center">
                      <span className="text-red-400 font-thin">{error}</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="bg-[#2EBED9] px-20 py-3 rounded-xl text-white cursor-pointer"
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
