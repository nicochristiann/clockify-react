import React, { useContext, useEffect, useState } from "react";
import ActivityInput from "../components/ActivityInput";
import Line from "../components/Line";
import Dates from "../components/Dates";
import Activity from "../components/Activity";
import { ActivityContext } from "../context/ActivityProvider";
import { TimerContext } from "../context/TimerProvider";

const ActivityPage = () => {
  const { activities } = useContext(ActivityContext);
  const { timer, getSeconds } = useContext(TimerContext);
  const [sortActivity, setSortActivity] = useState([]);
  const [sortChoice, setSortChoice] = useState("Latest Date");
  const [search, setSearch] = useState("");

  useEffect(() => {
    sorted(sortChoice);
  }, [sortChoice, activities]);

  const sorted = (choice) => {
    switch (choice) {
      case "Latest Date":
        sortDescending();
        break;
      case "Oldest Date":
        sortAscending();
        break;
      case "Nearby":
        // Belom
        break;
      default:
        break;
    }
  };

  // Descending
  const sortDescending = () => {
    const sort = [...activities].sort((a, b) => b.startTime - a.startTime);
    setSortActivity(sort);
  };

  // Ascending
  const sortAscending = () => {
    const sort = [...activities].sort((a, b) => a.startTime - b.startTime);
    setSortActivity(sort);
  };

  // Nearby

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
                search={search}
                setSearch={setSearch}
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
