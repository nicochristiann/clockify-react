import React, { useContext, useState } from "react";
import searchImg from "../assets/Clockify/Search.svg";
import dropdown from "../assets/Clockify/Dropdown-white.png";
import { ActivityContext } from "../context/ActivityProvider";

const ActivityInput = ({ sortChoice, setSortChoice }) => {
  const [isDown, setIsDown] = useState(false);
  const { keyword, setKeyword } = useContext(ActivityContext);
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
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              onKeyDown={(e) => {
                e.key === "Enter";
              }}
            />
            <img
              className="absolute h-11 w-auto right-1 top-2 cursor-pointer"
              src={searchImg}
              alt=""
              onClick={() => {}}
            />
          </div>

          {/* Drop Down List */}
          <button
            type="button"
            className="relative bg-[#434B8C] w-[30%] h-[100%] py-6 flex items-center rounded-xl justify-between cursor-pointer"
            onClick={() => {
              setIsDown(!isDown);
            }}
            onBlur={() => {
              setIsDown(false);
            }}
          >
            <div className="absolute left-5 text-white font-light text-sm lg:text-lg md:text-md cursor-pointer">
              {sortChoice}
            </div>
            <img
              className={`absolute right-4 h-5 w-auto transition-transform duration-300 ${
                isDown ? "rotate-180" : "rotate-0"
              }`}
              src={dropdown}
              alt=""
            />
            <div
              className={`absolute z-10 top-[100%] left-0 w-[100%] rounded-xl bg-white transition-all duration-300 ease-in-out transform ${
                isDown
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-15 pointer-events-none"
              }`}
            >
              <ul className="cursor-pointer text-left">
                <li
                  className="px-4 py-2 text-sm lg:text-lg md:text-md hover:bg-gray-200 rounded-xl"
                  onClick={() => {
                    setSortChoice("Latest Date");
                    setIsDown(false);
                  }}
                >
                  Latest Date
                </li>
                <li
                  className="px-4 py-2 text-sm lg:text-lg md:text-md hover:bg-gray-200 rounded-xl"
                  onClick={() => {
                    setSortChoice("Nearby");
                    setIsDown(false);
                  }}
                >
                  Nearby
                </li>
              </ul>
            </div>
          </button>
        </div>
      </form>
    </>
  );
};

export default ActivityInput;
