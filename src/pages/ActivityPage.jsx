import React, { useContext, useEffect, useState } from "react";
import ActivityInput from "../components/ActivityInput";
import Line from "../components/Line";
import Dates from "../components/Dates";
import Activity from "../components/Activity";
import { ActivityContext } from "../context/ActivityProvider";

const ActivityPage = () => {
  const { activities } = useContext(ActivityContext);

  // Descending
  const sortActivity = [...activities].sort(
    (a, b) => b.startTime - a.startTime
  );

  const formatter = (h, m, s, type) => {
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return type === "timer" ? h + " : " + m + " : " + s : h + ":" + m + ":" + s;
  };

  const timerFormat = (time) => {
    const hour = Math.floor(time / 60 / 60) % 24;
    const minute = Math.floor(time / 60) % 60;
    const second = Math.floor(time % 60);

    return formatter(hour, minute, second, "timer");
  };

  const timer = (today) => {
    const s = today.getSeconds();
    const m = today.getMinutes();
    const h = today.getHours();

    return formatter(h, m, s, "time");
  };

  const getSeconds = (startTime, endTime) => {
    const seconds = startTime.getTime() - endTime.getTime();
    return timerFormat(Math.abs(seconds / 1000));
  };

  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const showDate = (activity, index, array) => {
    if (index === 0) {
      return true;
    } else if (
      index !== 0 &&
      !isSameDate(activity.startTime, array[index - 1].startTime)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <section>
        <div className="flex items-center w-screen justify-center">
          <div className="flex flex-col justify-center items-center w-[60vw]">
            <p className="text-white text-4xl mb-15">Activity</p>
            <div className="mb-15 w-[100%]">
              <ActivityInput />
            </div>

            {/* Activities */}
            <div className="w-[100%] h-[60vh] overflow-hidden overflow-y-auto">
              {/* Date */}

              {/* Activities on current Date */}
              <div className="w-[100%] flex flex-col items-center overflow-hidden">
                {sortActivity.map((activity, index, array) => (
                  <>
                    {showDate(activity, index, array) && (
                      <Dates createdDate={activity.startTime} />
                    )}

                    <Activity
                      key={activity.id}
                      activity={activity}
                      duration={getSeconds(
                        activity.startTime,
                        activity.endTime
                      )}
                      startTime={timer(activity.startTime)}
                      endTime={timer(activity.endTime)}
                    />
                    {index < array.length - 1 &&
                      isSameDate(
                        activity.startTime,
                        array[index + 1].startTime
                      ) && <Line />}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivityPage;
