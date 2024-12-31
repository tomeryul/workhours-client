import axios from "axios";

// login
export const login = async (username, password) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const res = await axios.post("http://localhost:3000/login", {
      username: username,
      password: password,
    });
    if(res?.status === 200)
      sessionStorage.setItem("username",username);
      
    
    return res;
  } catch (e) {
    console.error(e);
  }
};


// Logout function in ApiRequests.js
export const logout = async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.post(
      "http://localhost:3000/logout",
      {}, // No body needed
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
        },
      }
    );

    // Clear session storage on successful logout
    sessionStorage.clear();
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};


// set start work hours of user
export const setWorkTimeStart = async () => {
  try {
    const res = await axios.post(
      "http://localhost:3000/work-time/start",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Failed to set work start time:", error);
    throw error;
  }
};

// set end work hours of user
export const setWorkTimeEnd = async () => {
  try {
    const res = await axios.post(
      "http://localhost:3000/work-time/end",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Failed to set work end time:", error);
    throw error;
  }
};

// get work hours of all the users
export const getAllUserWorkTimes = async () => {
  try {
    const res = await axios.get("http://localhost:3000/work-time/all", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Failed to fetch all users' work times:", error);
    throw error;
  }
};


// Modify work hours of a specific user
export const modifyWorkHoursOfUser = async (email, startTime, endTime) => {
  try {
    const res = await axios.put(
      `http://localhost:3000/work-time/edit/${email}`,
      { startTime, endTime },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Failed to modify work hours:", error);
    throw error;
  }
};

export const getUserWorkTimes = async (username) => {
  try {
    const res = await axios.get(`http://localhost:3000/work-time/${username}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Failed to fetch user work times:", error);
    throw error;
  }
};


// get time
export const getTime = async () => {
  const res = await axios.get("http://localhost:3000/time/germany");
  return res;
};
