import React, { useState } from "react";
import LoginPage from "./LoginPage";
import UserStatus from "./UserStatus";
import AdminStatus from "./AdminStatus";
import { logout } from "../ApiRequests"; // Import logout function

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("token") ? true : false);

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout API
      sessionStorage.removeItem("token"); // Clear the token
      sessionStorage.removeItem("role"); // Clear the role
      setLoggedIn(false); // Update state
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  // Check the role dynamically from sessionStorage
  const role = sessionStorage.getItem("role");
  

  return (
    <>
      {!loggedIn ? (
        <LoginPage logIn={() => setLoggedIn(true)} />
      ) : role === "Admin" ? (
        <AdminStatus onLogout={handleLogout} />
      ) : (
        <UserStatus onLogout={handleLogout} />
      )}
    </>
  );
};

export default Home;
