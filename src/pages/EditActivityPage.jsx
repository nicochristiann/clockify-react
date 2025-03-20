import React, { useContext, useEffect, useRef, useState } from "react";
import Locations from "../components/Locations";
import { ActivityContext } from "../context/ActivityProvider";
import { data, useNavigate, useParams } from "react-router";
import TimerButtons from "../components/TimerButtons";
import TextArea from "../components/TextArea";
import StartEndTime from "../components/StartEndTime";
import { TimerContext } from "../context/TimerProvider";
import EditTime from "../components/EditTime";
import { UserContext } from "../context/UserProvider";

const EditActivityPage = () => {
  const { id } = useParams();

  // Context
  const { updateActivity, getActivity } = useContext(ActivityContext);
  const { dateFormat, timer, getSeconds } = useContext(TimerContext);
  const [currActivity, setCurrActivity] = useState({});

  // Get An Activity
  useEffect(() => {
    const fetchActivity = async () => {
      const data = await getActivity(id);
      if (data) {
        setTime(getSeconds(data.start_time, data.end_time));
        setStartTime(timer(data.start_time));
        setEndTime(timer(data.end_time));
        setStartDate(dateFormat(data.start_time));
        setEndDate(dateFormat(data.end_time));
        setStartDateTime(data.start_time);
        setEndDateTime(data.end_time);
        setLatitude(data.location_lat);
        setLongitude(data.location_lng);
        setDescription(data.description);
      }
      // console.log(data);
      setCurrActivity(data);
    };
    fetchActivity();
  }, [id]);

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

  // Set Current Activity
  useEffect(() => {
    const setEdit = async () => {
      // console.log(currActivity);
      setTime(getSeconds(currActivity.start_time, currActivity.end_time));
      setStartTime(timer(currActivity.start_time));
      setEndTime(timer(currActivity.end_time));
      setStartDate(dateFormat(currActivity.start_time));
      setEndDate(dateFormat(currActivity.end_time));
      setStartDateTime(currActivity.start_time);
      setEndDateTime(currActivity.end_time);
      setLatitude(currActivity.location_lat);
      setLongitude(currActivity.location_lng);
      setDescription(currActivity.description);
    };
    setEdit();
  }, [currActivity]);

  const { mutate } = updateActivity;
  const navigation = useNavigate();

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
      uuid: currActivity.uuid,
      start_time: startDateTime,
      end_time: endDateTime,
      description: description,
      location_lat: currActivity.location_lat,
      location_lng: currActivity.location_lng,
      created_at: currActivity.created_at,
      updatedAt: new Date(),
    };
    // console.log(updateActivity);
    // updateActivity(updatedActivity);
    mutate(updatedActivity);
    navigation("/activity");
  };

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.2)] backdrop-blur-[10px]">
          <div>
            <EditTime
              startDateTime={currActivity.start_time}
              setStartDateTime={setStartDateTime}
              endDateTime={currActivity.end_time}
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
                isEdit={true}
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
