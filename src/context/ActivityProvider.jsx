import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ActivityContext = createContext();

const ActivityProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        });
      }
    };
    getLocation();
  }, []);

  // Add Activity
  const addActivity = useMutation({
    mutationFn: async (newActivity) => {
      const res = await fetch(
        "https://f20d-103-19-109-29.ngrok-free.app/api/v1/activity",
        // "http://localhost:3000/api/v1/activity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
            "ngrok-skip-browser-warning": 6024,
          },
          body: JSON.stringify(newActivity),
        }
      );
      const data = await res.json();
      // console.log(data);
      return data;
    },
    onSuccess: queryClient.invalidateQueries(["activity"]),
  });

  // Delete Activity
  const deleteActivity = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(
        `https://f20d-103-19-109-29.ngrok-free.app/api/v1/activity/${id}`,
        // `http://localhost:3000/api/v1/activity/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
            "ngrok-skip-browser-warning": 6024,
          },
        }
      );
      const data = await res.json();
      // console.log(data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["activity"]);
      // window.location.reload(); // Reload halaman setelah sukses delete
    },
  });

  // Update Activity
  const updateActivity = useMutation({
    mutationFn: async (activity) => {
      const res = await fetch(
        `https://f20d-103-19-109-29.ngrok-free.app/api/v1/activity/${activity.uuid}`,
        // `http://localhost:3000/api/v1/activity/${activity.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
            "ngrok-skip-browser-warning": 6024,
          },
          body: JSON.stringify(activity),
        }
      );
      const data = await res.json();
      // console.log(data);
      return data;
    },
    onSuccess: queryClient.invalidateQueries(["activity"]),
  });

  // Get An Activity
  const getActivity = async (id) => {
    const res = await fetch(
      `https://f20d-103-19-109-29.ngrok-free.app/api/v1/activity/${id}`,
      // `http://localhost:3000/api/v1/activity/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
          "ngrok-skip-browser-warning": 6024,
        },
      }
    );
    const datas = await res.json();
    // console.log(datas);
    const activity = datas.activity;
    // console.log(activity);
    const formattedData = {
      uuid: activity.uuid,
      user_uuid: activity.user_uuid,
      start_time: new Date(activity.start_time),
      end_time: new Date(activity.end_time),
      description: activity.description,
      location_lat: activity.location_lat,
      location_lng: activity.location_lng,
      created_at: new Date(activity.createdAt),
      updated_at: new Date(activity.updatedAt),
    };
    return formattedData;
  };

  const getFilterActivities = async (choice) => {
    if (!latitude || !longitude) {
    }
    const res = await fetch(
      `https://f20d-103-19-109-29.ngrok-free.app/api/v1/activity?description=${keyword}&sortBy=${choice}&lat=${latitude}&lng=${longitude}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
          "ngrok-skip-browser-warning": 6024,
        },
      }
    );
    // console.log(res);
    const datas = await res.json();

    const formattedData = datas.data.activities.map((activity) => ({
      uuid: activity.uuid,
      user_uuid: activity.user_uuid,
      start_time: new Date(activity.start_time),
      end_time: new Date(activity.end_time),
      description: activity.description,
      location_lat: activity.location_lat,
      location_lng: activity.location_lng,
      created_at: new Date(activity.createdAt),
      updated_at: new Date(activity.updatedAt),
    }));
    // console.log(formattedData);
    return formattedData;
  };

  return (
    <ActivityContext.Provider
      value={{
        longitude,
        latitude,
        keyword,
        setLatitude,
        setLongitude,
        setKeyword,
        addActivity,
        deleteActivity,
        updateActivity,
        getActivity,
        getFilterActivities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export default ActivityProvider;
