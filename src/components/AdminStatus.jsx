import React, { useState , useEffect} from "react";
import { getAllUserWorkTimes, modifyWorkHoursOfUser } from "../ApiRequests";

const AdminStatus = ({ onLogout }) => {
  const [message, setMessage] = useState("");
  const [usersWorkTimes, setUsersWorkTimes] = useState({});
  const [email, setEmail] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dataShown, setDataShown] = useState(false);
  const [currentTime, setCurrentTime] = useState(""); // Track the live German time

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

  const handleFetchWorkTimes = async () => {
    try {
      if (!dataShown) {
        const response = await getAllUserWorkTimes();
        setUsersWorkTimes(response.data.data);
        setMessage("");
      } else {
        setUsersWorkTimes({});
      }
      setDataShown(!dataShown);
    } catch (error) {
      console.error("Error fetching users' work times:", error);
      setMessage("Failed to fetch users' work times.");
    }
  };

  const handleModifyWorkHours = async () => {
    if (!email || !startTime || !endTime) {
      setMessage("Please fill out all fields.");
      return;
    }

    // Format startTime and endTime to remove the 'T'
    const formattedStartTime = startTime.replace("T", " ");
    const formattedEndTime = endTime.replace("T", " ");

    try {
      await modifyWorkHoursOfUser(email, formattedStartTime, formattedEndTime);
      setMessage(`Work hours updated for ${email}`);
      handleFetchWorkTimes(); // Refresh the list
    } catch (error) {
      setMessage("Failed to modify work hours.");
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
       <div className="absolute top-2 left-4">
                <p className="text-indigo-700 text-[24px] font-bold text-center">
            {`${currentTime.replace(","," ")}`}
          </p>
          </div>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="font-bold text-3xl mb-6 text-indigo-700 text-center">
          Admin Status
        </h1>
        {message && <p className="text-red-500 mb-4 text-center">{message}</p>}
        <button
          onClick={handleFetchWorkTimes}
          className="mt-6 transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:shadow-lg"
        >
          {`${dataShown ? "Hide" : "Show"} Users' Work Times`}
        </button>
        {Object.keys(usersWorkTimes).length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Users' Work Times
            </h2>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    #
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Email
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Start Time
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    End Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const rows = [];
                  let index = 1;
                  for (const email in usersWorkTimes) {
                    const { startTime, endTime } = usersWorkTimes[email];
                    rows.push(
                      <tr key={email} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2">
                          {index}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {email}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {startTime || "Not Set"}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {endTime || "Not Set"}
                        </td>
                      </tr>
                    );
                    index++;
                  }
                  return rows;
                })()}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Modify User Work Hours
          </h2>
          <div className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="User Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded px-4 py-3 w-full bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
            />
            <input
              type="datetime-local"
              placeholder="Start Time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="rounded px-4 py-3 w-full bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
            />
            <input
              type="datetime-local"
              placeholder="End Time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="rounded px-4 py-3 w-full bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
            />
            <button
              onClick={handleModifyWorkHours}
              className="mt-5 transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:shadow-lg"
            >
              Update Work Hours
            </button>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="mt-6 transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:shadow-lg"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default AdminStatus;
