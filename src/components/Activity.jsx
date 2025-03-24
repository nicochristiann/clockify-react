import React, { useContext, useState } from "react";
import clock from "../assets/Clockify/clock.png";
import location from "../assets/Clockify/placeholder.png";
import { ActivityContext } from "../context/ActivityProvider";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteActivity } from "../services/ActivityApi";

const Activity = ({ activity, duration, startTime, endTime }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries(["activity"]);
    },
  });

  const onDeleteClick = (activityId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this activity?"
    );
    if (!confirm) return;

    setIsDeleting(true); // karena pake use state jadi bakal re render dlu

    // 0.5s sebelum data terhapus, dikasi animasi
    setTimeout(() => {
      mutate(activityId);
    }, 500);
  };

  const trimDescription = (description) => {
    return description.length > 15
      ? description.substring(0, 15) + "..."
      : description;
  };

  return (
    <div>
      <div
        className={`flex w-[75vw] h-[100%] cursor-pointer transition-all transform ${
          isDeleting
            ? "duration-500 opacity-0 translate-x-full"
            : "duration-200 hover:bg-[#192865] hover:-translate-x-[72px]"
        }`}
      >
        <Link to={`/edit-activity/${activity.uuid}`}>
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
            <div className="flex flex-col items-end">
              <p className="text-lg font-semibold text-white">
                {trimDescription(activity.description)}
              </p>
              <div className="flex items-center gap-1">
                <img className="w-3 h-4" src={location} alt="" />
                <p className="text-sm font-light text-[#A7A6C5]">
                  {`${activity.location_lat}.${activity.location_lng}`}
                </p>
              </div>
            </div>
          </div>
        </Link>
        <div>
          <button
            onClick={() => onDeleteClick(activity.uuid)}
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
