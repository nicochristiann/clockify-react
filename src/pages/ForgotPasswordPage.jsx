import React, { useState } from "react";
import EmailBox from "../components/EmailBox";
import { useFormik } from "formik";
import logo from "../assets/Clockify/Logo.png";
import { EmailSchema } from "../schema/UserSchema";
import { forgotPassword } from "../services/UserApi";

const ForgotPasswordPage = () => {
  const [isSent, setIsSent] = useState(false);

  const handleEmail = () => {
    forgotPassword(values.email);
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleEmail,
    validationSchema: EmailSchema,
  });
  return (
    <section>
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex flex-col items-center gap-[10vh]">
          <div>
            <img className="w-auto h-13" src={logo} alt="" />
          </div>
          <div className="bg-[rgba(0,0,0,0.3)] p-15 rounded-2xl">
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
              <div className="flex flex-col items-center gap-1">
                {isSent && (
                  <div className="flex items-center justify-center">
                    <span className="text-green-600 font-thin">
                      Please check you email to verify your account!
                    </span>
                  </div>
                )}
                <button
                  className="bg-[#2EBED9] px-37 py-4 rounded-xl text-white cursor-pointer"
                  type="submit"
                  onClick={() =>
                    setTimeout(() => {
                      setIsSent(true);
                    }, 500)
                  }
                >
                  VERIFY EMAIL
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
