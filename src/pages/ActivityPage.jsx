import React, { useContext, useEffect, useState } from "react";
import ActivityInput from "../components/ActivityInput";
import Line from "../components/Line";
import Dates from "../components/Dates";
import Activity from "../components/Activity";
import { ActivityContext } from "../context/ActivityProvider";
import { TimerContext } from "../context/TimerProvider";
import { useNavigate } from "react-router";

const ActivityPage = () => {
  const { activities, getLatestActivity, getNearbyActivity, getAllActivities } =
    useContext(ActivityContext);
  const { timer, getSeconds } = useContext(TimerContext);
  const [sortActivity, setSortActivity] = useState([]);
  const [sortChoice, setSortChoice] = useState("Latest Date");

  useEffect(() => {
    const fetchData = async () => {
      let data = [];
      if (sortChoice === "Latest Date") {
        data = await getAllActivities();
        // data = await getLatestActivity();
      } else if (sortChoice === "Nearby") {
        data = await getNearbyActivity();
      }
      setSortActivity(data);
    };
    fetchData();
  }, [sortChoice]);

  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const showDate = (activity, index, array) => {
    if (index === 0) {
      return true;
    } else if (
      index !== 0 &&
      !isSameDate(activity.startTime, array[index - 1].startTime)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <section>
        <div className="flex items-center w-screen justify-center">
          <div className="flex flex-col justify-center items-center">
            <p className="text-white text-4xl mb-15">Activity</p>
            <div className="mb-15 w-[60vw]">
              <ActivityInput
                sortChoice={sortChoice}
                setSortChoice={setSortChoice}
              />
            </div>

            {/* Activities */}
            <div className="w-[60vw] h-[58vh] overflow-y-scroll overflow-x-hidden">
              {/* Date */}

              {/* Activities on current Date */}
              <div className="flex flex-col">
                {sortActivity.map((activity, index, array) => (
                  <div key={activity.id}>
                    {showDate(activity, index, array) && (
                      <Dates createdDate={activity.startTime} />
                    )}

                    <Activity
                      key={activity.id}
                      activity={activity}
                      duration={getSeconds(
                        activity.startTime,
                        activity.endTime
                      )}
                      startTime={timer(activity.startTime)}
                      endTime={timer(activity.endTime)}
                    />
                    {index < array.length - 1 &&
                      isSameDate(
                        activity.startTime,
                        array[index + 1].startTime
                      ) && <Line />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivityPage;
