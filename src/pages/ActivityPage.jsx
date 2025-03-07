import React, { useEffect, useState } from "react";
import ActivityInput from "../components/ActivityInput";
import Line from "../components/Line";
import Dates from "../components/Dates";
import Activity from "../components/Activity";

const ActivityPage = () => {
  const activities = [
    {
      id: "1",
      startTime: new Date("2020-03-01T12:00:00"),
      endTime: new Date("2020-03-01T13:00:00"),
      description: "Badminton",
      location: "12.915555.77.21146",
    },
    {
      id: "2",
      startTime: new Date("2020-03-02T12:00:00"),
      endTime: new Date("2020-03-02T12:30:00"),
      description: "Futsal",
      location: "12.915555.77.21146",
    },
    {
      id: "3",
      startTime: new Date("2020-03-01T11:00:00"),
      endTime: new Date("2020-03-01T12:00:00"),
      description: "Basket",
      location: "12.915555.77.21146",
    },
    {
      id: "4",
      startTime: new Date("2020-03-05T18:00:00"),
      endTime: new Date("2020-03-05T20:00:00"),
      description: "Tennis",
      location: "12.915555.77.21146",
    },
    {
      id: "5",
      startTime: new Date("2020-03-01T08:00:00"),
      endTime: new Date("2020-03-01T12:00:00"),
      description: "Futsal",
      location: "12.915555.77.21146",
    },
    {
      id: "6",
      startTime: new Date("2020-03-02T12:00:00"),
      endTime: new Date("2020-03-02T15:00:00"),
      description: "Badminton",
      location: "12.915555.77.21146",
    },
    {
      id: "7",
      startTime: new Date("2020-03-05T18:00:00"),
      endTime: new Date("2020-03-05T20:00:00"),
      description: "Tennis",
      location: "12.915555.77.21146",
    },
    {
      id: "8",
      startTime: new Date("2020-03-01T08:00:00"),
      endTime: new Date("2020-03-01T12:00:00"),
      description: "Futsal",
      location: "12.915555.77.21146",
    },
    {
      id: "9",
      startTime: new Date("2020-03-02T12:00:00"),
      endTime: new Date("2020-03-02T15:00:00"),
      description: "Badminton",
      location: "12.915555.77.21146",
    },
  ];

  console.log(activities);

  // Descending
  const sortActivity = [...activities].sort(
    (a, b) => b.startTime - a.startTime
  );

  console.log(sortActivity);

  const formatter = (h, m, s, type) => {
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return type === "timer" ? h + " : " + m + " : " + s : h + ":" + m + ":" + s;
  };

  const timerFormat = (time) => {
    let hour = Math.floor(time / 60 / 60) % 24;
    let minute = Math.floor(time / 60) % 60;
    let second = Math.floor(time % 60);

    return formatter(hour, minute, second, "timer");
  };

  const timer = (today) => {
    const s = today.getSeconds();
    const m = today.getMinutes();
    const h = today.getHours();

    return formatter(h, m, s, "time");
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
            <div className="w-[100%]">
              <div className="w-[100%]">
                {/* Date */}

                {/* Activities on current Date */}
                <div className="w-[100%] flex flex-col items-center overflow-hidden">
                  {sortActivity.map((activity) => (
                    <>
                      <Dates />
                      <Activity
                        key={activity.id}
                        activity={activity}
                        duration={timerFormat(
                          activity.endTime - activity.startTime
                        )}
                        startTime={timer(activity.startTime)}
                        endTime={timer(activity.endTime)}
                      />
                      <Line />
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivityPage;
