import React, { useState, useEffect, useRef } from "react";
import search from "../assets/Clockify/Search.svg";
import dropdown from "../assets/Clockify/Dropdown-white.png";

const ActivityInput = ({ sortChoice, setSortChoice }) => {
  const [isDown, setIsDown] = useState(false);
  return (
    <>
      <form className="flex flex-col gap-5 w-[100%]">
        <div className="w-[100%] h-15 flex gap-5">
          {/* Search Activity */}
          <div className="relative w-[70%] h-[100%]">
            <input
              className="focus:outline-none bg-white absolute w-[100%] h-[100%] py-6 pl-4 rounded-xl text-sm lg:text-lg md:text-md"
              type="text"
              name="search"
              id="search"
              placeholder="Search activity"
            />
            <img
              className="absolute h-11 w-auto right-1 top-2 cursor-pointer"
              src={search}
              alt=""
            />
          </div>
          {/* Drop Down List */}
          <div
            className="relative bg-[#434B8C] w-[30%] h-[100%] px-4 py-6 flex items-center rounded-xl justify-between cursor-pointer"
            onClick={() => {
              setIsDown(!isDown);
            }}
          >
            <button
              type="button"
              className="absolute text-white font-light text-sm lg:text-lg md:text-md cursor-pointer"
            >
              {sortChoice}
            </button>
            <img
              className="absolute right-1 h-5 w-auto"
              src={dropdown}
              alt=""
            />
            {isDown && (
              <>
                <ul className="relative top-15 left-[-15px] mt-2 bg-white rounded-lg cursor-pointer">
                  <li
                    className="w-[100%] px-4 py-2 text-sm lg:text-lg md:text-md hover:bg-gray-200 rounded-lg cursor-pointer"
                    onClick={() => {
                      setSortChoice("Latest Date");
                      setIsDown(false);
                    }}
                  >
                    Latest Date
                  </li>
                  <li
                    className="w-[100%] px-4 py-2 text-sm lg:text-lg md:text-md hover:bg-gray-200 rounded-lg cursor-pointer"
                    onClick={() => {
                      setSortChoice("Oldest Date");
                      setIsDown(false);
                    }}
                  >
                    Oldest Date
                  </li>
                  <li
                    className="w-[100%] px-4 py-2 text-sm lg:text-lg md:text-md hover:bg-gray-200 rounded-lg cursor-pointer"
                    onClick={() => {
                      setSortChoice("Near Me");
                      setIsDown(false);
                    }}
                  >
                    Near Me
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default ActivityInput;
