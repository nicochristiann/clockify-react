import React, { useContext, useEffect, useRef, useState } from "react";
import Locations from "../components/Locations";
import { ActivityContext } from "../context/ActivityProvider";
import { useNavigate, useParams } from "react-router";
import TimerButtons from "../components/TimerButtons";
import TextArea from "../components/TextArea";
import StartEndTime from "../components/StartEndTime";
import { TimerContext } from "../context/TimerProvider";
import EditTime from "../components/EditTime";
import { UserContext } from "../context/UserProvider";

const EditActivityPage = () => {
  const { id } = useParams();
  const [currActivity, setCurrActivity] = useState({
    id: "",
    startTime: new Date(),
    endTime: new Date(),
    description: "",
    latitude: "",
    longitude: "",
  });

  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [description, setDescription] = useState("");

  // Context
  const { updateActivity } = useContext(ActivityContext);
  const { dateFormat, timer, getSeconds } = useContext(TimerContext);
  const { currUser } = useContext(UserContext);

  const navigation = useNavigate();

  useEffect(() => {
    currUser.id === "" && navigation("/login");
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        // const res = await fetch(`http://localhost:8000/activities/${id}`);
        const res = await fetch(`/api/v1/activity/${id}`);
        const data = await res.json();

        // Konversi format String di JSON ke Date
        const formattedData = {
          id: data.id,
          startTime: new Date(data.startTime),
          endTime: new Date(data.endTime),
          description: data.description,
          latitude: data.latitude,
          longitude: data.longitude,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
          userId: currUser.id,
        };

        setCurrActivity(formattedData);
      } catch (error) {
        console.error("Error Fetching Data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
  }, []);

  useEffect(() => {
    setTime(getSeconds(currActivity.startTime, currActivity.endTime));
    setStartTime(timer(currActivity.startTime));
    setEndTime(timer(currActivity.endTime));
    setStartDate(dateFormat(currActivity.startTime));
    setEndDate(dateFormat(currActivity.endTime));
    setStartDateTime(currActivity.startTime);
    setEndDateTime(currActivity.endTime);
    setLatitude(currActivity.latitude);
    setLongitude(currActivity.longitude);
    setDescription(currActivity.description);
    console.log(currActivity);
  }, [currActivity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description === "") {
      alert("Please fill the activity description");
      return;
    }

    const confirm = window.confirm(
      "Are you sure you want to update this activity?"
    );
    if (!confirm) return;

    const updatedActivity = {
      id: currActivity.id,
      startTime: startDateTime,
      endTime: endDateTime,
      description: description,
      latitude: currActivity.latitude,
      longitude: currActivity.longitude,
      createdAt: currActivity.createdAt,
      updatedAt: new Date(),
      userId: currUser.id,
    };
    // console.log(updateActivity);
    updateActivity(updatedActivity);
    navigation("/activity");
  };

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.2)] backdrop-blur-[10px]">
          <div>
            <EditTime
              startDateTime={currActivity.startTime}
              setStartDateTime={setStartDateTime}
              endDateTime={currActivity.endTime}
              setEndDateTime={setEndDateTime}
              setEndDate={setEndDate}
              setIsEditing={setIsEditing}
              setCurrActivity={setCurrActivity}
            />
          </div>
        </div>
      )}
      <section>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <span className="text-white text-3xl font-semibold mb-10">
              Timer
            </span>

            <span className="text-[#F8D068] text-lg font-semibold mb-30">
              {dateFormat(new Date())}
            </span>

            {/* Timer */}
            <p className="text-6xl text-white font-bold mb-35">{time}</p>

            {/* Start & End */}
            <div
              className="w-[250px] p-3 flex mb-7 justify-between transition-colors duration-200 rounded-lg cursor-pointer hover:bg-[rgba(255,255,255,0.2)]"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <StartEndTime
                startDate={startDate}
                startTime={startTime}
                endDate={endDate}
                endTime={endTime}
              />
            </div>
            {/* Location */}
            <div className="w-[350px] h-13 flex flex-col items-center justify-center bg-[#434B8C] rounded-xl shadow-md p-4 mb-10">
              <Locations
                latitude={latitude}
                setLatitude={setLatitude}
                longitude={longitude}
                setLongitude={setLongitude}
                isEdit={true}
              />
            </div>

            {/* Text Area */}
            <div className="w-[350px] h-30 mb-10">
              <TextArea
                description={description}
                setDescription={setDescription}
                setCurrActivity={setCurrActivity}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-5">
              {/* SAVE */}
              <TimerButtons
                text="SAVE"
                isBlue={true}
                isEdit={true}
                currActivity={currActivity}
              />

              {/* DELETE */}
              <TimerButtons
                text="DELETE"
                isBlue={false}
                isEdit={true}
                currActivity={currActivity}
              />
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditActivityPage;
