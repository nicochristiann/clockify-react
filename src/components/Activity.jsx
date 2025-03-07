import React, { useState } from "react";
import clock from "../assets/Clockify/clock.png";
import location from "../assets/Clockify/placeholder.png";

const Activity = ({ activity, duration, startTime, endTime }) => {
  return (
    // Perlu di ganti pake props lg nanti
    <div className="w-[100%]">
      <div className="w-[100%] flex justify-between px-5 py-3">
        <div>
          <p className="text-lg font-bold text-white">{duration}</p>
          <div className="flex items-center gap-1">
            <img className="w-3 h-3" src={clock} alt="" />
            <p className="text-sm font-light text-[#A7A6C5]">
              {startTime} - {endTime}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-white">
            {activity.description}
          </p>
          <div className="flex items-center gap-1">
            <img className="w-3 h-4" src={location} alt="" />
            <p className="text-sm font-light text-[#A7A6C5]">
              {activity.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
