import React, { useContext } from "react";
import clock from "../assets/Clockify/clock.png";
import location from "../assets/Clockify/placeholder.png";
import { ActivityContext } from "../context/ActivityProvider";
import { useNavigate } from "react-router";

const Activity = ({ activity, duration, startTime, endTime }) => {
  const { deleteActivity } = useContext(ActivityContext);
  const navigate = useNavigate();

  const onDeleteClick = (activityId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this activity?"
    );
    if (!confirm) return;
    deleteActivity(activityId);
  };

  return (
    <div className="">
      <div className="flex w-[75vw] h-[100%] cursor-pointer transition-all duration-300 transform hover:bg-[#192865] hover:translate-x-[-72px]">
        <div className="flex w-[60vw] justify-between px-[1vw] py-3">
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
                {`${activity.latitude}.${activity.longitude}`}
              </p>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => onDeleteClick(activity.id)}
            className="w-[72px] h-[100%] px-3 bg-red-400 cursor-pointer text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Activity;
