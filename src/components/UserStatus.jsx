import React, { useState, useEffect } from "react";
import { getUserWorkTimes, setWorkTimeStart, setWorkTimeEnd } from "../ApiRequests";

const UserStatus = ({ onLogout }) => {
  const [timeStart, setTimeStart] = useState(""); // Track saved start time
  const [timeEnd, setTimeEnd] = useState(""); // Track saved end time
  const [mode, setMode] = useState("start");
  const [currentTime, setCurrentTime] = useState(""); // Track the live German time

  // Fetch saved times on component load
  useEffect(() => {
    const fetchUserWorkTimes = async () => {
      try {
        const username = sessionStorage.getItem("username"); // Assuming username is stored in sessionStorage
        const response = await getUserWorkTimes(username);
        const { startTime, endTime } = response.data.data;

        setTimeStart(startTime || ""); // Initialize start time
        setTimeEnd(endTime || ""); // Initialize end time
        if (startTime !== "" && endTime === "")
          setMode("end"); // User has only startTime
        else if (startTime !== "" && endTime !== "")
          setMode("finished"); // User has both start and end time already set
      } catch (error) {
        console.error("Error fetching user work times:", error);
      }
    };

    fetchUserWorkTimes();
  }, []);

  // Fetch live German time and update every second
  useEffect(() => {
    const fetchLiveTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Europe/Berlin",
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
      const germanTime = new Intl.DateTimeFormat("en-GB", options).format(now);
      setCurrentTime(germanTime);
    };

    fetchLiveTime(); // Fetch the initial time immediately
    const interval = setInterval(fetchLiveTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const handleTimeAction = async () => {
    try {
      if (mode === "start") {
        const response = await setWorkTimeStart();
        const startTime = response.data.data.startTime;
        setTimeStart(startTime); // Update state with new start time
        setMode("end");
      } else {
        const response = await setWorkTimeEnd();
        const endTime = response.data.data.endTime;
        setTimeEnd(endTime); // Update state with new end time
        setMode("start");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
      <div className="absolute top-10">
      <p className="text-indigo-700 text-[36px] font-bold text-center">
        {`Welcome ${sessionStorage.getItem("username").split("@")[0]}`}
        </p>
                <p className="text-indigo-700 text-[24px] mt-4 font-bold text-center">
            {`${currentTime.replace(","," ")}`}
          </p>
          </div>
      <div className="border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
        <h1 className="font-bold text-3xl mb-6 text-indigo-700 text-center">User Status</h1>
        <div>
          {timeStart !== "" && (
            <p className="text-gray-700 text-sm text-center mt-2">{`Start Time: ${timeStart}`}</p>
          )}
          {timeEnd !== "" && (
            <p className="text-gray-700 text-sm text-center mt-2">{`End Time: ${timeEnd}`}</p>
          )}

        </div>

        <div className="flex flex-col space-y-4 mt-4">
          {/* Show button only if both times are not set */}
          {!(timeStart && timeEnd) && (
            <button
              onClick={handleTimeAction}
              className={`transition-all block py-3 px-4 w-full text-black font-bold rounded cursor-pointer ${
                mode === "start"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              } transform hover:-translate-y-1 hover:shadow-lg`}
            >
              {mode === "start" ? "Set Start Time" : "Set End Time"}
            </button>
          )}
          <button
            onClick={onLogout}
            className="mt-6 transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserStatus;
