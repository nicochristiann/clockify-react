import Cookies from "js-cookie";

// Add Activity
export const addActivity = async (newActivity) => {
  const res = await fetch(
    "https://clocklify-api.onrender.com/api/v1/activity",
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
  return data;
};

// Delete Activity
export const deleteActivity = async (id) => {
  const res = await fetch(
    `https://clocklify-api.onrender.com/api/v1/activity/${id}`,
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
  return data;
};

// Update Activity
export const updateActivity = async (activity) => {
  const res = await fetch(
    `https://clocklify-api.onrender.com/api/v1/activity/${activity.uuid}`,
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
  return data;
};

// Get An Activity
export const getActivity = async (id) => {
  const res = await fetch(
    `https://clocklify-api.onrender.com/api/v1/activity/${id}`,
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
  const activity = datas.activity;

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

export const getFilterActivities = async ({ queryKey }) => {
  const [, keyword, choice, latitude, longitude] = queryKey;
  if (latitude && longitude) {
    const res = await fetch(
      `https://clocklify-api.onrender.com/api/v1/activity?description=${keyword}&sortBy=${choice}&lat=${latitude}&lng=${longitude}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
          "ngrok-skip-browser-warning": 6024,
        },
      }
    );
    if (!res.ok) return [];
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
    return formattedData;
  }
};
