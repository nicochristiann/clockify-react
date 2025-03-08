import React, { useContext, useEffect, useRef, useState } from "react";
import Locations from "./Locations";
import { ActivityContext } from "../context/ActivityProvider";
import { useNavigate } from "react-router";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [description, setDescription] = useState("");

  const [eventState, setEventState] = useState("start");
  const timeId = useRef();

  const { activities, addActivity } = useContext(ActivityContext);
  const navigation = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description === "") {
      alert("Please fill the activity description");
      return;
    }

    const newActivity = {
      id: activities.length + 1,
      startTime: startDateTime,
      endTime: endDateTime,
      description: description,
      location: `${latitude}.${longitude}`,
    };
    addActivity(newActivity);
    navigation("/activity");
  };

  useEffect(() => {
    if (isStart) {
      timeId.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timeId.current);
  }, [isStart]);

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

  const timeFormat = (today) => {
    const s = today.getSeconds();
    const m = today.getMinutes();
    const h = today.getHours();

    return formatter(h, m, s, "time");
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Des",
  ];

  const dateFormat = (today) => {
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear() % 100;
    return day + " " + month + " " + year;
  };

  const reset = () => {
    setIsStart(false);
    setTime(0);
    setStartDate("-");
    setStartTime("-");
    setEndDate("-");
    setEndTime("-");
    setEventState("start");
    setActivity("");
  };

  const buttonBlue = "bg-[#2EBED9] w-40 py-3 rounded-xl text-white";
  const buttonWhite = "bg-white w-40 py-3 rounded-xl text-[#A7A6C5]";

  return (
    <>
      <section>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <span className="text-white text-3xl font-semibold mb-40">
              Timer
            </span>

            {/* Timer */}
            <p className="text-6xl text-white font-bold mb-35">
              {timerFormat(time)}
            </p>

            {/* Start & End */}
            <div className="flex gap-10 mb-10">
              <div className="flex flex-col items-center text-white">
                <span className="text-[14px]">Start Time</span>
                <span className="text-[20px]">
                  {startTime ? startTime : "-"}
                </span>
                <span className="text-[12px]">
                  {startDate ? startDate : "-"}
                </span>
              </div>
              <div className="flex flex-col items-center text-white">
                <span className="text-[14px]">End Time</span>
                <span className="text-[20px]">{endTime ? endTime : "-"}</span>
                <span className="text-[12px]">{endDate ? endDate : "-"}</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="w-[350px] h-13 flex flex-col items-center justify-center bg-[#434B8C] rounded-xl shadow-md p-4 mb-10">
            <Locations
              latitude={latitude}
              setLatitude={setLatitude}
              longitude={longitude}
              setLongitude={setLongitude}
            />
          </div>

          {/* Text Area */}
          <div className="w-[350px] h-30 mb-10">
            <textarea
              id="activity"
              type="text"
              placeholder="Write your activity here ..."
              className="p-2.5 rounded-2xl bg-[#F5F6FC] w-[100%] h-[100%] resize-none text-sm"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          {/* Buttons */}

          {/* START */}
          <div className="flex gap-5">
            {eventState === "start" && (
              <>
                <button
                  id="start"
                  className={buttonBlue}
                  onClick={() => {
                    if (!isStart) {
                      const today = new Date();
                      clearInterval(timeId.current);
                      setStartDateTime(today);
                      setStartDate(dateFormat(today));
                      setStartTime(timeFormat(today));
                    }
                    setIsStart(!isStart);
                    setEventState("running");
                    // buttonSelection();
                  }}
                >
                  START
                </button>
              </>
            )}
            {eventState === "running" && (
              <>
                {/* STOP */}
                <button
                  id="stop"
                  className={buttonBlue}
                  onClick={() => {
                    const today = new Date();
                    clearInterval(timeId.current);
                    setEndDateTime(today);
                    setEndDate(dateFormat(today));
                    setEndTime(timeFormat(today));
                    setEventState("stop");
                  }}
                >
                  STOP
                </button>

                {/* RESET */}
                <button
                  className={buttonWhite}
                  onClick={() => {
                    reset();
                  }}
                >
                  RESET
                </button>
              </>
            )}

            {eventState === "stop" && (
              <>
                {/* SAVE */}
                <button id="save" className={buttonBlue} type="submit">
                  SAVE
                </button>

                {/* DELETE */}
                <button
                  className={buttonWhite}
                  onClick={() => {
                    reset();
                  }}
                >
                  DELETE
                </button>
              </>
            )}
          </div>
        </form>
      </section>
    </>
  );
};

export default Timer;
