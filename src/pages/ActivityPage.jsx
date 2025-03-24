import React, { useContext, useEffect, useState } from "react";
import ActivityInput from "../components/ActivityInput";
import Line from "../components/Line";
import Dates from "../components/Dates";
import Activity from "../components/Activity";
import { ActivityContext } from "../context/ActivityProvider";
import { TimerContext } from "../context/TimerProvider";

const ActivityPage = () => {
  const { activities, isLoading, setChoice, refetch } =
    useContext(ActivityContext);
  const { timer, getSeconds } = useContext(TimerContext);
  const [sortChoice, setSortChoice] = useState("Latest Date");
  const [isSearch, setIsSearch] = useState(false);

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
      refetch();
      setIsSearch(false);
    };
    fetchData();
  }, [isSearch]);

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
              />
            </div>
            {isLoading && (
              <p className="text-white text-xl">Loading activities...</p>
            )}
            {/* Activities */}
            <div className="w-[60vw] h-[58vh] overflow-y-scroll overflow-x-hidden">
              {/* Date */}

              {/* Activities on current Date */}
              {activities.length === 0 && !isLoading ? (
                <p className="text-white text-xl text-center">
                  No Activity Available!
                </p>
              ) : (
                <div className="flex flex-col">
                  {activities.map((activity, index, array) => (
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
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivityPage;
