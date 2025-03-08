import React from "react";

const Dates = ({ createdDate }) => {
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
    const year = today.getFullYear();
    return day + " " + month + " " + year;
  };

  return (
    <div className="w-[100%] h-[100%] bg-[#434B8C] px-4 py-1 text-md">
      <p className="text-[#F8D068]">{dateFormat(createdDate)}</p>
    </div>
  );
};

export default Dates;
