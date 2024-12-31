import React, { useState } from "react";
import { login } from "../ApiRequests";

const LoginPage = ({ logIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To display validation errors

  const handleLogin = async (email, password) => {
    // Frontend validation
    if (!email || !email.includes("@")) {
      setError("Invalid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await login(email, password); // Validate with server
      if (response?.status === 200) {
        sessionStorage.setItem("token", response?.data?.token); // save the token
        if(response?.data?.isAdmin === true)
          sessionStorage.setItem("role", "Admin");
        else
          sessionStorage.setItem("role", "User");

        logIn(); // Log in if credentials are correct
        setError(""); // Clear errors
      } else {
        setError("Invalid email or password.");
      }
    } catch (e) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    
    <div className="bg-gray-200 flex justify-center items-center h-screen w-screen">
      <div className="border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
        <h1 className="font-bold text-3xl mb-6 text-indigo-700 text-center">Log In</h1>
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(email, password);
          }}
        >
          <label className="text-gray-500 block mt-3">
            {"Email Address"}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="me@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
            />
          </label>
          <label className="text-gray-500 block mt-3">
            {"Password"}
            <input
              className="rounded px-4 py-3 w-full mt-1 bg-white text-gray-900 border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-100"
              type="password"
              id="password"
              name="password"
              label="Password"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          
          <button
            type="submit"
            className="mt-6 transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};


export default LoginPage;
