import React from "react";
import { useState } from "react";
import key from "../assets/Clockify/Key.svg";
import eyeOn from "../assets/Clockify/Icon/Back-white-1.png";
import eyeOff from "../assets/Clockify/Icon/Eye-Off.png";

// const PasswordBox = ({ password, setPassword, isConfirm }) => {
const PasswordBox = ({
  isConfirm,
  password,
  handleChange,
  handleBlur,
  isReset,
}) => {
  const [showPass, setShowPass] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const fieldBlur = (e) => {
    e.target.value === "" && setIsFocused(false);
  };

  const handleShow = () => {
    if (isConfirm && isFocused && !isReset) {
      return "Confirm Password";
    } else if (isConfirm && !isFocused && !isReset) {
      return "Confirm Your Password";
    } else if (!isConfirm && isFocused && !isReset) {
      return "Password";
    } else if (!isConfirm && !isFocused && !isReset) {
      return "Input Your Password";
    } else if (isConfirm && isFocused && isReset) {
      return "Confirm New Password";
    } else if (isConfirm && !isFocused && isReset) {
      return "Confirm Your New Password";
    } else if (!isConfirm && isFocused && isReset) {
      return "New Password";
    } else if (!isConfirm && !isFocused && isReset) {
      return "Input Your New Password";
    }
  };

  const pass = isConfirm ? "confirmPassword" : "password";

  return (
    <>
      <div className="flex gap-3 h-9">
        <div className="flex items-end">
          <img className="w-auto h-7" src={key} alt="" />
        </div>
        <div className="flex flex-col h-[100%]">
          <div className="relative w-[400px]">
            <input
              className="focus:outline-none absolute border-b-[1px] w-[100%] p-2 border-white text-white"
              type={showPass ? "text" : "password"}
              id={pass}
              onFocus={handleFocus}
              onBlur={(e) => {
                fieldBlur(e);
                handleBlur;
              }}
              value={password}
              onChange={handleChange}
              name={pass}
            />
            <label
              className={`absolute left-2 text-md cursor-text transition-all duration-200 ${
                isFocused
                  ? "top-[-22px] text-sm text-white"
                  : "top-2 text-md text-gray-300"
              }`}
              htmlFor={pass}
              id={pass}
            >
              {handleShow()}
            </label>
            <img
              className="cursor-pointer absolute right-0 top-1.5 h-7 w-auto"
              src={showPass ? eyeOn : eyeOff}
              id="eye"
              alt=""
              onClick={() => setShowPass(!showPass)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordBox;
