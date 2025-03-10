import React, { useContext, useEffect, useRef, useState } from "react";
import Locations from "./Locations";
import { ActivityContext } from "../context/ActivityProvider";
import { useNavigate } from "react-router";
import TimerButtons from "./TimerButtons";
import TextArea from "./TextArea";
import StartEndTime from "./StartEndTime";
import { TimerContext } from "../context/TimerProvider";

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
  const { timerFormat, dateFormat, timer } = useContext(TimerContext);
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
      latitude,
      longitude,
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

  const reset = () => {
    setIsStart(false);
    setTime(0);
    setStartDate("-");
    setStartTime("-");
    setEndDate("-");
    setEndTime("-");
    setEventState("start");
    setDescription("");
  };

  const handleButton = () => {
    const today = new Date();
    clearInterval(timeId.current);

    if (eventState === "start") {
      setStartDateTime(today);
      setStartDate(dateFormat(today));
      setStartTime(timer(today));
      setIsStart(!isStart);
      setEventState("running");
    } else if (eventState === "running") {
      setEndDateTime(today);
      setEndDate(dateFormat(today));
      setEndTime(timer(today));
      setEventState("stop");
    } else if (eventState === "stop") {
      reset();
    }
  };

  const buttonBlue =
    "bg-[#2EBED9] w-40 py-3 rounded-xl text-white cursor-pointer";
  const buttonWhite =
    "bg-white w-40 py-3 rounded-xl text-[#A7A6C5] cursor-pointer";

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
              <StartEndTime
                startDate={startDate}
                startTime={startTime}
                endDate={endDate}
                endTime={endTime}
                isEdit={false}
              />
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
              <TextArea
                description={description}
                setDescription={setDescription}
              />
            </div>

            {/* Buttons */}

            {/* START */}
            <div className="flex gap-5">
              {eventState === "start" && (
                <TimerButtons
                  text="START"
                  isBlue={true}
                  setEventState={setEventState}
                  handleButton={handleButton}
                />
              )}
              {eventState === "running" && (
                <>
                  {/* STOP */}
                  <TimerButtons
                    text="STOP"
                    isBlue={true}
                    setEventState={setEventState}
                    handleButton={handleButton}
                  />

                  {/* RESET */}
                  <TimerButtons text="RESET" isBlue={false} reset={reset} />
                </>
              )}

              {eventState === "stop" && (
                <>
                  {/* SAVE */}
                  <TimerButtons text="SAVE" isBlue={true} />

                  {/* DELETE */}
                  <TimerButtons
                    text="DELETE"
                    isBlue={false}
                    reset={reset}
                    isEdit={false}
                  />
                </>
              )}
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Timer;
