import React, { useContext, useEffect } from "react";
import logo from "../assets/Clockify/Logo.png";
import { useFormik } from "formik";
import PasswordBox from "../components/PasswordBox";
import { PasswordSchema } from "../schema/UserSchema";
import { UserContext } from "../context/UserProvider";
import { useNavigate, useLocation } from "react-router";
import { resetPassword } from "../services/UserApi";

const ResetPasswordPage = () => {
  const location = useLocation();

  // Extract the reset token from URL query parameter "resetToken"
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get("resetToken");

  // const { resetPassword } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    !resetToken && navigate("/forgot-password");
  }, []);

  const handleReset = (values) => {
    // console.log(resetToken, values.password, values.confirmpassword);
    resetPassword(resetToken, values.password, values.confirmPassword);
    if (!errors) navigate("/login");
  };

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: handleReset,
    validationSchema: PasswordSchema,
  });

  const fontStyle = "text-red-400 text-sm";
  return (
    <section className="relative w-full justify-center items-center">
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex flex-col items-center gap-[10vh]">
          <div>
            <img className="w-auto h-13" src={logo} alt="Logo.png" />
          </div>
          <div className="bg-[rgba(0,0,0,0.3)] p-15 rounded-2xl">
            <form className="flex flex-col gap-12" onSubmit={handleSubmit}>
              <div className="relative flex flex-col mb-5">
                <PasswordBox
                  isConfirm={false}
                  password={values.password}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isReset={true}
                />
                <label
                  htmlFor="password"
                  className="text-red-400 text-sm absolute top-11 left-12"
                >
                  {errors.password}
                </label>
              </div>
              <div className="relative flex flex-col">
                <PasswordBox
                  isConfirm={true}
                  confirmPassword={values.confirmPassword}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isReset={true}
                />
                <label
                  htmlFor="password"
                  className="text-red-400 text-sm absolute top-11 left-12"
                >
                  {errors.confirmPassword}
                </label>
              </div>

              <div className="flex flex-col pl-10">
                <span className={fontStyle}>Must contain at least:</span>
                <span className={fontStyle}>- 8 Characters</span>
                <span className={fontStyle}>- 1 Uppercase (A-Z)</span>
                <span className={fontStyle}>- 1 Lowercase (a-z)</span>
                <span className={fontStyle}>- 1 Number (0-9)</span>
                <span className={fontStyle}>
                  - 1 Special Character (?=.*[!@#\$%\^&\*])
                </span>
              </div>

              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  className="bg-[#2EBED9] px-20 py-3 rounded-xl text-white cursor-pointer"
                >
                  RESET PASSWORD
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
