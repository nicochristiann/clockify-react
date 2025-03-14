import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { UserContext } from "./UserProvider";
import Cookies from "js-cookie";

export const ActivityContext = createContext();

const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [keyword, setKeyword] = useState("");

  const { currUser } = useContext(UserContext);

  const getAllActivities = async () => {
    try {
      const res = await fetch(
        // `http://localhost:8000/activities?userId=${currUser.id}`
        `https://light-master-eagle.ngrok-free.app/api/v1/activity/`
      );
      const data = await res.json();

      console.log(data);

      // convert format String di JSON ke Date
      const formattedData = [data.activities].map((activity) => ({
        ...activity,
        startTime: new Date(activity.start_time),
        endTime: new Date(activity.end_time),
      }));

      setActivities(formattedData);
    } catch (error) {
      console.log("Error Fetching Data", error);
    } finally {
      setLoading(false);
    }
  };

  // Add Activity
  const addActivity = async (newActivity) => {
    // diganti ke proxy nnti
    const res = await fetch("http://localhost:8000/activities", {
      // const res = await fetch("http://localhost:8000/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newActivity),
    });
    return;
  };

  // Delete Activity
  const deleteActivity = async (id) => {
    // diganti ke proxy nnti
    const res = await fetch(`http://localhost:8000/activities/${id}`, {
      // const res = await fetch(`http://localhost:8000/activities/${id}`, {
      method: "DELETE",
    });
    return;
  };

  // Update Activity
  const updateActivity = async (activity) => {
    // diganti ke proxy nnti
    const res = await fetch(`http://localhost:8000/activities/${activity.id}`, {
      // const res = await fetch(`http://localhost:8000/activities/${activity.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activity),
    });
    return;
  };

  // Get Activity (Latest)
  const getLatestActivity = async () => {
    try {
      // console.log(Cookies.get("token"));
      const res = await fetch(
        "http://light-master-eagle.ngrok-free.app/api/v1/activity/filter?sortBy=latest",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const data = await res.json();
      const formattedData = [data.activities];
      setActivities(formattedData);
    } catch (error) {
      console.log("Error Fetching Data: ", error);
    }

    return;
  };

  // Get Activity (Nearby)
  const getNearbyActivity = async () => {
    try {
      const res = await fetch(
        `http://light-master-eagle.ngrok-free.app/api/v1/activity/filter?sortBy=distance&lat=${latitude}&lng=${longitude}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const data = await res.json();
      const formattedData = [data.activities];
      setActivities(formattedData);
    } catch (error) {
      console.log("Error Fetching Data: ", error);
    }
    return;
  };

  // Get Activity (Search)
  const getSearchActivity = async () => {
    try {
      const res = await fetch(
        `http://light-master-eagle.ngrok-free.app/api/v1/activity/search?description=${keyword}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const data = await res.json();
      const formattedData = [data.activities];
      setActivities(formattedData);
    } catch (error) {
      console.log("Error Fetching Data: ", error);
    }
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        longitude,
        latitude,
        keyword,
        setLatitude,
        setLongitude,
        setKeyword,
        addActivity,
        deleteActivity,
        updateActivity,
        getLatestActivity,
        getNearbyActivity,
        getAllActivities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export default ActivityProvider;
