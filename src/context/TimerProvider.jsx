import React, { createContext } from "react";

export const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  const formatter = (h, m, s, type) => {
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return type === "timer" ? h + " : " + m + " : " + s : h + ":" + m + ":" + s;
  };

  const timerFormat = (time) => {
    const hour = Math.floor(time / 60 / 60);
    const minute = Math.floor(time / 60) % 60;
    const second = Math.floor(time % 60);

    return formatter(hour, minute, second, "timer");
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

  const timer = (today) => {
    const s = today.getSeconds();
    const m = today.getMinutes();
    const h = today.getHours();

    return formatter(h, m, s, "time");
  };

  const getSeconds = (startTime, endTime) => {
    const seconds = endTime.getTime() - startTime.getTime();
    return timerFormat(seconds / 1000); // ubah dari milisecond ke second
  };

  return (
    <TimerContext.Provider
      value={{ timerFormat, dateFormat, timer, getSeconds }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
