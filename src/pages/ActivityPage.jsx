import React, { useContext, useEffect, useState } from "react";
import ActivityInput from "../components/ActivityInput";
import Line from "../components/Line";
import Dates from "../components/Dates";
import Activity from "../components/Activity";
import { ActivityContext } from "../context/ActivityProvider";
import { TimerContext } from "../context/TimerProvider";

const ActivityPage = () => {
  const { getFilterActivities } = useContext(ActivityContext);
  const { timer, getSeconds } = useContext(TimerContext);
  const [sortActivity, setSortActivity] = useState([]);
  const [sortChoice, setSortChoice] = useState("Latest Date");
  const [isSearch, setIsSearch] = useState(false);
  const [choice, setChoice] = useState("latestdate");

  useEffect(() => {
    if (sortChoice === "Latest Date") {
      setChoice("latestdate");
    } else if (sortChoice === "Nearby") {
      setChoice("nearby");
    } else if (sortChoice === "Oldest Date") {
      setChoice("oldestdate");
    }
  }, [sortChoice]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isSearch) return;
      // console.log(choice);
      const data = await getFilterActivities(choice);
      data && setSortActivity(data);
      setIsSearch(false);
    };
    fetchData();
  }, [isSearch]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFilterActivities(choice);
      // console.log(data);
      setSortActivity(data);
    };
    fetchData();
  }, [choice]);

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
      !isSameDate(activity.start_time, array[index - 1].start_time)
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
                setIsSearch={setIsSearch}
                sortActivity={sortActivity}
              />
            </div>

            {/* Activities */}
            <div className="w-[60vw] h-[58vh] overflow-y-scroll overflow-x-hidden">
              {/* Date */}

              {/* Activities on current Date */}
              <div className="flex flex-col">
                {sortActivity.map((activity, index, array) => (
                  <div key={activity.uuid}>
                    {showDate(activity, index, array) && (
                      <Dates createdDate={activity.start_time} />
                    )}

                    <Activity
                      key={activity.uuid}
                      activity={activity}
                      duration={getSeconds(
                        activity.start_time,
                        activity.end_time
                      )}
                      startTime={timer(activity.start_time)}
                      endTime={timer(activity.end_time)}
                    />
                    {index < array.length - 1 &&
                      isSameDate(
                        activity.start_time,
                        array[index + 1].start_time
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
