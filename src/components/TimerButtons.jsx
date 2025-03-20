import React, { useContext } from "react";
import { ActivityContext } from "../context/ActivityProvider";
import { useNavigate } from "react-router";

const TimerButtons = ({
  text,
  isBlue,
  setEventState,
  handleButton,
  reset,
  isEdit,
  currActivity,
}) => {
  const buttonBlue =
    "bg-[#2EBED9] w-40 py-3 rounded-xl text-white cursor-pointer";
  const buttonWhite =
    "bg-white w-40 py-3 rounded-xl text-[#A7A6C5] cursor-pointer";

  const { deleteActivity, updateActivity } = useContext(ActivityContext);
  const navigate = useNavigate();

  const { mutate } = deleteActivity;

  const remove = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this activity?"
    );
    if (!confirm) return;
    mutate(currActivity.uuid);
    isEdit && navigate("/activity");
  };

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
        if (!isEdit) {
          reset();
        } else {
          remove();
        }
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
