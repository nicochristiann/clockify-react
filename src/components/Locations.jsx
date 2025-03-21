import React, { useEffect } from "react";
import locationImg from "../assets/Clockify/Placeholder-big.svg";

const Locations = ({
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  isEdit,
}) => {
  !isEdit &&
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        });
      }
    }, [latitude, longitude]);

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
