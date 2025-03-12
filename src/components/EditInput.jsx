import React from "react";

const EditInput = ({ time, setTime, min, max }) => {
  return (
    <input
      className={`text-center bg-black rounded-lg text-lg text-white p-1 w-11.5 ${
        min === 2000 ? "w-16.5" : "w-11.5"
      }`}
      type="text"
      value={time}
      onChange={(e) => {
        const newValue = e.target.value.replace(/\D/g, "");
        setTime(newValue);
      }}
      onBlur={(e) => {
        const val = Number(e.target.value);
        if (val < min) {
          setTime(min);
        } else if (val > max) {
          setTime(max);
        } else {
          setTime(val);
        }
      }}
      onKeyDown={(e) => {
        e.key === "Enter" && e.target.blur();
      }}
    />
  );
};

export default EditInput;
