import React from "react";
import ActivityInput from "../components/ActivityInput";
import clock from "../assets/Clockify/clock.png";
import location from "../assets/Clockify/placeholder.png";
import Line from "../components/Line";

const ActivityPage = () => {
  const dates = ["1 Mar 2020", "2 Mar 2020", "3 Mar 2020", "4 Mar 2020"];
  const activities = [
    {
      created: "1 Mar 2020",
      duration: "00:30:00",
      startTime: "12:00:00",
      endTime: "12:30:00",
      description: "Badminton",
      location: "12.915555.77.21146",
    },
    {
      created: "1 Mar 2020",
      duration: "00:30:00",
      startTime: "12:00:00",
      endTime: "12:30:00",
      description: "Futsal",
      location: "12.915555.77.21146",
    },
    {
      created: "2 Mar 2020",
      duration: "00:30:00",
      startTime: "12:00:00",
      endTime: "12:30:00",
      description: "Basket",
      location: "12.915555.77.21146",
    },
    {
      created: "3 Mar 2020",
      duration: "00:30:00",
      startTime: "12:00:00",
      endTime: "12:30:00",
      description: "Tennis",
      location: "12.915555.77.21146",
    },
    {
      created: "3 Mar 2020",
      duration: "00:30:00",
      startTime: "12:00:00",
      endTime: "12:30:00",
      description: "Futsal",
      location: "12.915555.77.21146",
    },
    {
      created: "4 Mar 2020",
      duration: "00:30:00",
      startTime: "12:00:00",
      endTime: "12:30:00",
      description: "Badminton",
      location: "12.915555.77.21146",
    },
  ];
  return (
    <>
      <section>
        <div className="flex items-center w-screen justify-center">
          <div className="flex flex-col justify-center items-center w-[60vw]">
            <p className="text-white text-4xl mb-15">Activity</p>
            <div className="mb-15 w-[100%]">
              <ActivityInput />
            </div>

            {/* Activities */}
            <div className="w-[100%]">
              <div className="w-[100%]">
                {/* Date */}
                <div className="w-[100%] h-[100%] bg-[#434B8C] px-4 py-1 text-md">
                  <p className="text-[#F8D068]">12 Mar 2020</p>
                </div>
                {/* Activities on current Date */}
                <div className="w-[100%] flex flex-col items-center">
                  {/* Each Activity */}
                  <div className="w-[100%]">
                    <div className="w-[100%] flex justify-between px-5 py-3">
                      <div>
                        <p className="text-lg font-bold text-white">
                          00 : 30 : 00
                        </p>
                        <div className="flex items-center gap-1">
                          <img className="w-3 h-3" src={clock} alt="" />
                          <p className="text-sm font-light text-[#A7A6C5]">
                            12:00:00 - 12:30:00
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-white">
                          Treadmill
                        </p>
                        <div className="flex items-center gap-1">
                          <img className="w-3 h-4" src={location} alt="" />
                          <p className="text-sm font-light text-[#A7A6C5]">
                            12.915555.77.21146
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Line */}
                  <Line />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivityPage;
