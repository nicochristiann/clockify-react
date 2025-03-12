import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { UserContext } from "./UserProvider";

export const ActivityContext = createContext();

const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const { currUser } = useContext(UserContext);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/activities?userId=${currUser.id}`
        );
        const data = await res.json();

        // Konversi format String di JSON ke Date
        const formattedData = data.map((activity) => ({
          ...activity,
          startTime: new Date(activity.startTime),
          endTime: new Date(activity.endTime),
        }));

        setActivities(formattedData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  // useEffect(() => {
  //   console.log("Updated activities:", activities);
  // }, [activities]);

  // Add Activity
  const addActivity = async (newActivity) => {
    const res = await fetch("http://localhost:8000/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newActivity),
    });
    return;
  };

  // Delete Activity
  const deleteActivity = async (id) => {
    const res = await fetch(`http://localhost:8000/activities/${id}`, {
      method: "DELETE",
    });
    return;
  };

  // Update Activity
  const updateActivity = async (activity) => {
    const res = await fetch(`http://localhost:8000/activities/${activity.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activity),
    });
    return;
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        addActivity,
        deleteActivity,
        updateActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export default ActivityProvider;
