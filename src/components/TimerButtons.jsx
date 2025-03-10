import React from "react";

const TimerButtons = ({ text, isBlue, setEventState, handleButton, reset }) => {
  const buttonBlue =
    "bg-[#2EBED9] w-40 py-3 rounded-xl text-white cursor-pointer";
  const buttonWhite =
    "bg-white w-40 py-3 rounded-xl text-[#A7A6C5] cursor-pointer";

  const buttonSelection = () => {
    switch (text) {
      case "START":
        setEventState("running");
        handleButton();
        break;
      case "STOP":
        setEventState("stop");
        handleButton();
        break;
      case "RESET":
        reset();
        break;
      case "DELETE":
        reset();
        break;
      default:
        break;
    }
  };
  return (
    <button
      className={isBlue ? buttonBlue : buttonWhite}
      onClick={buttonSelection}
      type={text === "SAVE" ? "submit" : "button"}
    >
      {text}
    </button>
  );
};

export default TimerButtons;
