import React from "react";
import { createContext, useState } from "react";

export const ActivityContext = createContext();

const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([
    {
      id: "1",
      startTime: new Date("2020-03-01T12:00:00"),
      endTime: new Date("2020-03-01T13:00:00"),
      description: "Badminton",
      latitude: "12.915555",
      longitude: "77.21146",
    },
    {
      id: "2",
      startTime: new Date("2020-03-02T12:00:00"),
      endTime: new Date("2020-03-02T12:30:00"),
      description: "Futsal",
      latitude: "12.915555",
      longitude: "77.21146",
    },
    {
      id: "3",
      startTime: new Date("2020-03-01T11:00:00"),
      endTime: new Date("2020-03-01T12:00:00"),
      description: "Basket",
      latitude: "12.915555",
      longitude: "77.21146",
    },
    {
      id: "4",
      startTime: new Date("2020-03-05T18:00:00"),
      endTime: new Date("2020-03-05T20:00:00"),
      description: "Tennis",
      latitude: "12.915555",
      longitude: "77.21146",
    },
    {
      id: "5",
      startTime: new Date("2020-03-01T08:00:00"),
      endTime: new Date("2020-03-01T12:00:00"),
      description: "Futsal",
      latitude: "12.915555",
      longitude: "77.21146",
    },
    {
      id: "6",
      startTime: new Date("2020-03-02T12:00:00"),
      endTime: new Date("2020-03-02T15:00:00"),
      description: "Badminton",
      latitude: "12.915555",
      longitude: "77.21146",
    },
    {
      id: "7",
      startTime: new Date("2020-03-05T18:00:00"),
      endTime: new Date("2020-03-05T20:00:00"),
      description: "Tennis",
      latitude: "12.915555",
      longitude: "77.21146",
    },
    {
      id: "8",
      startTime: new Date("2020-03-01T08:00:00"),
      endTime: new Date("2020-03-01T12:00:00"),
      description: "Futsal",
      latitude: "12.915555",
      longitude: "77.21146",
    },
    {
      id: "9",
      startTime: new Date("2020-03-02T12:00:00"),
      endTime: new Date("2020-03-02T15:00:00"),
      description: "Badminton",
      latitude: "12.915555",
      longitude: "77.21146",
    },
  ]);

  const addActivity = (newActivity) => {
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

  const deleteActivity = (id) => {
    setActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== id)
    );
  };

  return (
    <ActivityContext.Provider
      value={{ activities, addActivity, deleteActivity }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export default ActivityProvider;
