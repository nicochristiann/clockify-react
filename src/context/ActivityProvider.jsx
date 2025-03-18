import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { UserContext } from "./UserProvider";
import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ActivityContext = createContext();

const ActivityProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const [activities, setActivities] = useState([]);
  // const [allActivities, setAllActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [currActivity, setCurrActivity] = useState({
    uuid: "",
    user_uuid: "",
    start_time: new Date(),
    end_time: new Date(),
    description: "",
    location_lat: "",
    location_lng: "",
    created_at: new Date(),
    updatedAt: new Date(),
  });

  const getAllActivities = async () => {
    // console.log(Cookies.get("token"));
    try {
      const res = await fetch(
        `https://25b7-103-47-133-72.ngrok-free.app/api/v1/activity`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
            Accept: "application/json",
            // "ngrok-skip-browser-warning": "true",
          },
        }
      );

      // Debugging
      console.log("Raw Response:", res);
      console.log("Status Response:", res.status);
      console.log("Header Response:", res.headers.get("content-type"));

      const data = await res.json();
      console.log(data);

      // convert format String di JSON ke Date
      return [data.activities].map((activity) => ({
        ...activity,
        start_time: new Date(activity.start_time),
        end_time: new Date(activity.end_time),
      }));
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  // const { currUser } = useContext(UserContext);
  // const { data: activities, isLoading } = useQuery({
  //   queryKey: ["activity", user_uuid],
  //   queryFn: getAllActivities,
  // });

  // if (isLoading)

  // Add Activity
  const addActivity = useMutation({
    mutationFn: async (newActivity) => {
      const res = await fetch(
        "https://light-master-eagle.ngrok-free.app/api/v1/activity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify(newActivity),
        }
      );
      const data = await res.json();
      console.log(data);
      return data;
    },
    onSuccess: queryClient.invalidateQueries(["activity"]),
  });

  // Delete Activity
  const deleteActivity = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(
        `https://light-master-eagle.ngrok-free.app/api/v1/activity/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      console.log(data);
      return data;
    },
    onSuccess: queryClient.invalidateQueries(["activity"]),
  });

  // Update Activity
  const updateActivity = useMutation({
    mutationFn: async (activity) => {
      const res = await fetch(
        `https://light-master-eagle.ngrok-free.app/api/v1/activity/${activity.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(activity),
        }
      );
      const data = await res.json();
      console.log(data);
      return data;
    },
    onSuccess: queryClient.invalidateQueries(["activity"]),
  });

  // Get Activity (Latest)
  const getLatestActivity = async () => {
    const res = await fetch(
      "https://light-master-eagle.ngrok-free.app/api/v1/activity/filter?sortBy=latest",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    console.log(res);
    const datas = await res.json();

    console.log(datas);
    // const formattedData = [datas.data.activities];
    const formattedData = datas.activities.map((activity) => ({
      ...activity,
      start_tme: new Date(activity.start_time),
      end_time: new Date(activity.end_time),
    }));
    // setActivities(formattedData);
    return formattedData;
  };

  // Get Activity (Nearby)
  const getNearbyActivity = async () => {
    const res = await fetch(
      `https://light-master-eagle.ngrok-free.app/api/v1/activity/filter?sortBy=distance&lat=${latitude}&lng=${longitude}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    const datas = await res.json();
    // const formattedData = [datas.data.activities];
    const formattedData = [datas.data.activities].map((activity) => ({
      ...activity,
      start_tme: new Date(activity.start_time),
      end_time: new Date(activity.end_time),
    }));
    setActivities(formattedData);
    return;
  };

  // Get Activity (Search)
  const getSearchActivity = async () => {
    const res = await fetch(
      `https://light-master-eagle.ngrok-free.app/api/v1/activity/search?description=${keyword}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    const datas = await res.json();
    // const formattedData = [datas.data.activities];
    const formattedData = [datas.data.activities].map((activity) => ({
      ...activity,
      start_tme: new Date(activity.start_time),
      end_time: new Date(activity.end_time),
    }));
    setActivities(formattedData);
    return;
  };

  // Get An Activity
  const getActivity = async (id) => {
    const res = await fetch(
      `https://light-master-eagle.ngrok-free.app/api/v1/activity/${id}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    if (data.status === "success") {
      const formattedData = data.activity.map((activity) => ({
        uuid: activity.uuid,
        user_uuid: activity.user_uuid,
        start_time: new Date(activity.start_time),
        end_time: new Date(activity.end_time),
        description: activity.description,
        location_lat: activity.location_lat,
        location_lng: activity.location_lng,
        created_at: new Date(activity.created_at),
        updated_at: new Date(activity.updated_at),
      }));
      // console.log(formattedData);
      setCurrActivity(formattedData);
    } else {
      console.log(data);
    }
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        longitude,
        latitude,
        keyword,
        currActivity,
        setCurrActivity,
        setLatitude,
        setLongitude,
        setKeyword,
        addActivity,
        deleteActivity,
        updateActivity,
        getLatestActivity,
        getNearbyActivity,
        getAllActivities,
        getSearchActivity,
        getActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export default ActivityProvider;
