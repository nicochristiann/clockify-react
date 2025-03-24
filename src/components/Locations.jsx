import React from "react";
import locationImg from "../assets/Clockify/Placeholder-big.svg";

const Locations = ({ latitude, longitude }) => {
  return (
    <div className="relative flex flex-row items-center w-[100%]">
      <img src={locationImg} alt="" className="ml-5" />
      <p className="text-white text-[14px] absolute flex items-center w-[100%] justify-center">
        {latitude && longitude
          ? `${latitude}.${longitude}`
          : "Fetching location..."}
      </p>
    </div>
  );
};

export default Locations;
