import React, { useState } from "react";
import mail from "../assets/Clockify/Icon/e-mail.png";

// const EmailBox = ({ email, setEmail, handleChange, handleBlur }) => {
const EmailBox = ({ email, handleChange, handleBlur }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const fieldBlur = (e) => {
    e.target.value === "" && setIsFocused(false);
  };

  return (
    <>
      <div className="flex gap-3 h-9">
        <div className="flex items-end">
          <img className="w-auto h-7" src={mail} alt="" />
        </div>
        <div className="flex flex-col">
          <div className="relative w-[400px]">
            <input
              className="focus:outline-none absolute border-b-[1px] w-[100%] p-2 border-white text-white text-md"
              type="email"
              id="email"
              name="email"
              onFocus={handleFocus}
              onBlur={(e) => {
                fieldBlur(e);
                handleBlur;
              }}
              value={email}
              onChange={handleChange}
            />
            <label
              className={`absolute left-2 text-md cursor-text transition-all duration-200 ${
                isFocused
                  ? "top-[-22px] text-sm text-white"
                  : "top-2 text-md text-gray-300"
              }`}
              htmlFor="email"
              id="emailLabel"
            >
              {isFocused ? "E-mail" : "Input Your Email"}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailBox;
