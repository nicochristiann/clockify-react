import React, { useContext, useEffect, useState } from "react";
import closeImg from "../assets/Clockify/close.png";
import EditInput from "./EditInput";

const EditTime = ({
  startDateTime,
  endDateTime,
  setIsEditing,
  setCurrActivity,
}) => {
  const [startHours, setStartHours] = useState(0);
  const [startMinutes, setStartMinutes] = useState(0);
  const [startSeconds, setStartSeconds] = useState(0);
  const [startDate, setStartDate] = useState(0);
  const [startMonth, setStartMonth] = useState(0);
  const [startYear, setStartYear] = useState(0);

  const [endHours, setEndHours] = useState(0);
  const [endMinutes, setEndMinutes] = useState(0);
  const [endSeconds, setEndSeconds] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [endMonth, setEndMonth] = useState(0);
  const [endYear, setEndYear] = useState(0);

  useEffect(() => {
    // startDateTime
    setStartHours(startDateTime.getHours());
    setStartMinutes(startDateTime.getMinutes());
    setStartSeconds(startDateTime.getSeconds());
    setStartDate(startDateTime.getDate());
    setStartMonth(startDateTime.getMonth() + 1);
    setStartYear(startDateTime.getFullYear());
    // endDateTime
    setEndHours(endDateTime.getHours());
    setEndMinutes(endDateTime.getMinutes());
    setEndSeconds(endDateTime.getSeconds());
    setEndDate(endDateTime.getDate());
    setEndMonth(endDateTime.getMonth() + 1);
    setEndYear(endDateTime.getFullYear());
  }, [startDateTime, endDateTime]);

  const dayFormat = (month, year) => {
    if (month % 2 === 1) {
      return 31;
    } else if (month % 2 === 0 && month != 2) {
      return 30;
    } else {
      return year % 4 === 0 ? 29 : 28;
    }
  };

  const isValidInput = () => {
    const startDateTime = new Date(
      startYear,
      startMonth - 1,
      startDate,
      startHours,
      startMinutes,
      startSeconds
    );
    const endDateTime = new Date(
      endYear,
      endMonth - 1,
      endDate,
      endHours,
      endMinutes,
      endSeconds
    );

    return startDateTime <= endDateTime;
  };

  const setDateTime = () => {
    setCurrActivity((prev) => ({
      ...prev,
      startTime: new Date(
        startYear,
        startMonth - 1,
        startDate,
        startHours,
        startMinutes,
        startSeconds
      ),
      endTime: new Date(
        endYear,
        endMonth - 1,
        endDate,
        endHours,
        endMinutes,
        endSeconds
      ),
    }));
  };

  return (
    <>
      <div className="relative flex flex-col px-10 rounded-xl bg-[rgba(197,197,197,0.6)] backdrop-blur-[10px] h-[350px] items-center justify-center gap-8">
        <img
          className="cursor-pointer absolute top-6 right-6"
          src={closeImg}
          alt=""
          onClick={() => {
            setIsEditing(false);
          }}
        />
        <div className="flex gap-10">
          <div className="flex flex-col items-center gap-4">
            <span className="text-2xl">Start Time</span>
            <div className="text-2xl flex gap-0.5">
              <EditInput
                time={startHours}
                setTime={setStartHours}
                min={0}
                max={23}
              />
              :
              <EditInput
                time={startMinutes}
                setTime={setStartMinutes}
                min={0}
                max={59}
              />
              :
              <EditInput
                time={startSeconds}
                setTime={setStartSeconds}
                min={0}
                max={59}
              />
            </div>
            <div className="flex flex-col items-center gap-4">
              <span className="text-2xl">Start Date</span>
              <div className="text-2xl flex gap-0.5">
                <EditInput
                  time={startDate}
                  setTime={setStartDate}
                  min={1}
                  max={Number(dayFormat(startMonth, startYear))}
                />
                -
                <EditInput
                  time={startMonth}
                  setTime={setStartMonth}
                  min={1}
                  max={12}
                />
                -
                <EditInput
                  time={startYear}
                  setTime={setStartYear}
                  min={2000}
                  max={2025}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-2xl">End Time</span>
            <div className="text-2xl flex gap-0.5">
              <EditInput
                time={endHours}
                setTime={setEndHours}
                min={0}
                max={23}
              />
              :
              <EditInput
                time={endMinutes}
                setTime={setEndMinutes}
                min={0}
                max={59}
              />
              :
              <EditInput
                time={endSeconds}
                setTime={setEndSeconds}
                min={0}
                max={59}
              />
            </div>
            <div className="flex flex-col items-center gap-4">
              <span className="text-2xl">End Date</span>
              <div className="text-2xl flex gap-0.5">
                <EditInput
                  time={endDate}
                  setTime={setEndDate}
                  min={1}
                  max={Number(dayFormat(endMonth, endYear))}
                />
                -
                <EditInput
                  time={endMonth}
                  setTime={setEndMonth}
                  min={1}
                  max={12}
                />
                -
                <EditInput
                  time={endYear}
                  setTime={setEndYear}
                  min={2000}
                  max={2025}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            if (isValidInput()) {
              setDateTime();
              setIsEditing(false);
            } else {
              window.alert("Input a valid date time");
            }
          }}
          className="bg-[#2EBED9] w-40 py-3 rounded-xl text-white cursor-pointer"
        >
          SAVE
        </button>
      </div>
    </>
  );
};

export default EditTime;
