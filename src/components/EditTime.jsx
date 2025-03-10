import React, { useEffect, useState } from "react";
import closeImg from "../assets/Clockify/close.png";

const EditTime = ({
  startDateTime,
  setStartDateTime,
  endDateTime,
  setEndDateTime,
  setIsEditing,
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

  const formatter = (number) => {
    return number < 10 ? "0" + number : number;
  };

  const dayFormat = (month, year) => {
    if (
      month === 1 ||
      month === 1 ||
      month === 3 ||
      month === 5 ||
      month === 7 ||
      month === 9 ||
      month === 11
    ) {
      return 31;
    } else if (
      month === 4 ||
      month === 6 ||
      month === 8 ||
      month === 10 ||
      month === 12
    ) {
      return 30;
    } else if (month === 2) {
      return year % 4 === 0 ? 29 : 28;
    }
    return 0;
  };

  const checkInput = (input, time, type) => {
    switch (time) {
      case "hours":
        if (input > 23) {
          type === "start" ? setStartHours(23) : setEndHours(23);
        }
        break;
      case "minutes":
        if (input > 59) {
          type === "start" ? setStartMinutes(59) : setEndMinutes(59);
        }
        break;
      case "seconds":
        if (input > 59) {
          type === "start" ? setStartSeconds(59) : setEndSeconds(59);
        }
        break;
      case "date":
        if (input > 12) {
          type === "start" ? setStartMinutes(59) : setEndMinutes(59);
        }
        break;
      case "month":
        if (input > 12) {
          type === "start" ? setStartMonth(12) : setEndMonth(12);
        }
        break;
      case "year":
        if (input > 2025) {
          type === "start" ? setStartYear(2025) : setEndYear(2025);
        }
        break;
    }
  };

  const pressEnter = (e) => {
    e.key === "Enter" && e.target.blur();
  };

  return (
    <>
      <div className="relative w-11.550px] flex flex-col px-10 rounded-xl bg-[rgba(197,197,197,0.6)] backdrop-blur-[10px] h-[310px] items-center justify-center gap-8">
        <img
          className="cursor-pointer absolute top-8 right-8"
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
              <input
                className="text-center bg-black rounded-lg text-lg text-white w-11.5 p-2"
                type="text"
                name="startHours"
                value={startHours}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, "");
                  setStartHours(newValue);
                }}
                onBlur={(e) => {
                  let num = Number(e.target.value);
                  if (num < 0) setStartHours(0);
                  if (num > 23) setStartHours(23);
                }}
                onKeyDown={(e) => {
                  pressEnter(e);
                }}
              />
              :
              <input
                className="text-center bg-black rounded-lg text-lg text-white w-11.5 p-2"
                type="text"
                name="startMinutes"
                min={0}
                max={59}
                value={startMinutes}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, "");
                  setStartMinutes(newValue);
                }}
                onBlur={(e) => {
                  let num = Number(e.target.value);
                  if (num < 0) setStartMinutes(0);
                  if (num > 59) setStartMinutes(59);
                }}
                onKeyDown={(e) => {
                  pressEnter(e);
                }}
              />
              :
              <input
                className="text-center bg-black rounded-lg text-lg text-white w-11.5 p-2"
                type="text"
                name="startSeconds"
                min={0}
                max={59}
                value={startSeconds}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, "");
                  setStartSeconds(newValue);
                }}
                onBlur={(e) => {
                  let num = Number(e.target.value);
                  if (num < 0) setStartSeconds(0);
                  if (num > 59) setStartSeconds(59);
                }}
                onKeyDown={(e) => {
                  pressEnter(e);
                }}
              />
            </div>
            <div className="text-2xl flex gap-0.5">
              <input
                className="text-center bg-black rounded-lg text-lg text-white w-11.5 p-2"
                type="text"
                name="startDate"
                min={1}
                max={dayFormat(startMonth, startYear)}
                value={startDate}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, "");
                  setStartDate(newValue);
                }}
                onBlur={(e) => {
                  const date = Number(dayFormat(startMonth, startYear));
                  let num = Number(e.target.value);
                  if (num < 0) setStartDate(0);
                  if (num > date) setStartDate(date);
                }}
                onKeyDown={(e) => {
                  pressEnter(e);
                }}
              />
              -
              <input
                className="text-center bg-black rounded-lg text-lg text-white w-11.5 p-2"
                type="text"
                name="startMonth"
                min={1}
                max={12}
                value={startMonth}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, "");
                  setStartMonth(newValue);
                }}
                onBlur={(e) => {
                  let num = Number(e.target.value);
                  if (num < 0) setStartMonth(0);
                  if (num > 12) setStartMonth(12);
                }}
                onKeyDown={(e) => {
                  pressEnter(e);
                }}
              />
              -
              <input
                className="text-center bg-black rounded-lg text-lg text-white w-16.5 p-2"
                type="text"
                name="startYear"
                min={2000}
                max={2025}
                value={startYear}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, "");
                  setStartYear(newValue);
                }}
                onBlur={(e) => {
                  let num = Number(e.target.value);
                  if (num < 2000) setStartYear(2000);
                  if (num > 2025) setStartYear(2025);
                }}
                onKeyDown={(e) => {
                  pressEnter(e);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-2xl">End Time</span>
            <div className="text-2xl flex gap-0.5">
              <input
                className="text-center bg-black rounded-lg text-lg text-white w-11.5 p-2"
                type="text"
                name="endHours"
                min={0}
                max={23}
                value={endHours}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, "");
                  setEndHours(newValue);
                }}
                onBlur={(e) => {
                  let num = Number(e.target.value);
                  if (num < 0) setEndHours(0);
                  if (num > 23) setEndHours(23);
                }}
                onKeyDown={(e) => {
                  pressEnter(e);
                }}
              />
              :
              <input
                className="text-center bg-black rounded-lg text-lg text-white w-11.5 p-2"
                type="text"
                name="endMinutes"
                min={0}
                max={59}
                value={endMinutes}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, "");
                  setEndMinutes(newValue);
                }}
                onBlur={(e) => {
                  let num = Number(e.target.value);
                  if (num < 0) setEndMinutes(0);
                  if (num > 59) setEndMinutes(59);
                }}
                onKeyDown={(e) => {
                  pressEnter(e);
                }}
              />
              :
              <input
                className="text-center bg-black rounded-lg text-lg text-white w-11.5 p-2"
                type="text"
                name="endSeconds"
                min={0}
                max={59}
                value={endSeconds}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, "");
                  setEndSeconds(newValue);
                }}
                onBlur={(e) => {
                  let num = Number(e.target.value);
                  if (num < 0) setEndSeconds(0);
                  if (num > 59) setEndSeconds(59);
                }}
                onKeyDown={(e) => {
                  pressEnter(e);
                }}
              />
            </div>
            <div className="text-2xl flex gap-0.5">
              <input
                className="text-center bg-black rounded-lg text-lg text-white w-11.5 p-2"
                type="text"
                name="endDate"
                min={1}
                max={dayFormat(endMonth, endYear)}
                value={endDate}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, "");
                  setEndDate(newValue);
                }}
                onBlur={(e) => {
                  const date = Number(dayFormat(endMonth, endYear));
                  let num = Number(e.target.value);
                  if (num < 0) setEndDate(0);
                  if (num > date) setEndDate(date);
                }}
                onKeyDown={(e) => {
                  pressEnter(e);
                }}
              />
              -
              <input
                className="text-center bg-black rounded-lg text-lg text-white w-11.5 p-2"
                type="text"
                name="endMonth"
                min={1}
                max={12}
                value={endMonth}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, "");
                  setEndMonth(newValue);
                }}
                onBlur={(e) => {
                  let num = Number(e.target.value);
                  if (num < 0) setEndMonth(0);
                  if (num > 12) setEndMonth(12);
                }}
                onKeyDown={(e) => {
                  pressEnter(e);
                }}
              />
              -
              <input
                className="text-center bg-black rounded-lg text-lg text-white w-16.5 p-2"
                type="text"
                name="endYear"
                min={2000}
                max={2025}
                value={endYear}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, "");
                  setEndYear(newValue);
                }}
                onBlur={(e) => {
                  let num = Number(e.target.value);
                  if (num < 2000) setEndYear(2000);
                  if (num > 2025) setEndYear(2025);
                }}
                onKeyDown={(e) => {
                  pressEnter(e);
                }}
              />
            </div>
          </div>
        </div>
        <button className="bg-[#2EBED9] w-40 py-3 rounded-xl text-white cursor-pointer">
          SAVE
        </button>
      </div>
    </>
  );
};

export default EditTime;
