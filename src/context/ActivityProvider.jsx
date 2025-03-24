import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFilterActivities } from "../services/ActivityApi";

export const ActivityContext = createContext();

const ActivityProvider = ({ children }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [choice, setChoice] = useState("latestdate");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, []);

  const {
    data: activities = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["activity", choice, latitude, longitude],
    queryFn: () =>
      getFilterActivities({
        queryKey: ["activity", keyword, choice, latitude, longitude],
      }),
    enabled: !!latitude && !!longitude, // Cuman fetch kalo latitude longitude ada
  });

  return (
    <ActivityContext.Provider
      value={{
        longitude,
        latitude,
        keyword,
        choice,
        activities,
        isLoading,
        setKeyword,
        setChoice,
        refetch,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export default ActivityProvider;
