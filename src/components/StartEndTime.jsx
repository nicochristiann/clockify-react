import React from "react";

const StartEndTime = ({ startTime, startDate, endTime, endDate }) => {
  const style = "flex flex-col flex-none items-center text-white px-3 py-1";

  return (
    <>
      <div className={style}>
        <span className="text-[14px]">Start Time</span>
        <span className="text-[20px]">{startTime ? startTime : "-"}</span>
        <span className="text-[12px]">{startDate ? startDate : "-"}</span>
      </div>
      <div className={style}>
        <span className="text-[14px]">End Time</span>
        <span className="text-[20px]">{endTime ? endTime : "-"}</span>
        <span className="text-[12px]">{endDate ? endDate : "-"}</span>
      </div>
    </>
  );
};

export default StartEndTime;
