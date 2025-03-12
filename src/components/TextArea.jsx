import React from "react";

const TextArea = ({ description, setDescription, setCurrActivity }) => {
  return (
    <textarea
      id="activity"
      type="text"
      placeholder="Write your activity here ..."
      className="p-2.5 rounded-2xl bg-[#F5F6FC] w-[100%] h-[100%] resize-none text-sm focus:outline-none"
      value={description}
      onChange={(e) => {
        setDescription(e.target.value);
      }}
      onBlur={(e) => {
        setCurrActivity((prev) => ({
          ...prev,
          description: e.target.value,
        }));
      }}
      onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
    />
  );
};

export default TextArea;
