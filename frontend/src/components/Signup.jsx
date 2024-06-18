import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [inputes, setInputes] = useState({
    email: "",
    username: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputes({ ...inputes, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:1700/api/signup",
        inputes
      );
      if (response.data.message === "User Already Exists") {
        alert(response.data.message);
      } else {
        alert(response.data.message);
        setInputes({
          email: "",
          username: "",
          password: "",
        });
        navigate("/signin"); // Redirect to '/signin' upon successful signup
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again."); 
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-50">
      {/* Left Side - Heading */}
      <div className="w-full md:w-1/3 flex items-center justify-center mb-8 md:mb-0">
        <h1 className="text-4xl font-bold text-slate-600 md:text-6xl">
          Sign Up
        </h1>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full md:w-2/3 max-w-md bg-white p-8 rounded-lg shadow-md">
        <form className="w-full">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your Email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
              onChange={change}
              value={inputes.email}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter a username"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
              onChange={change}
              value={inputes.username}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Set a Strong Password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
              onChange={change}
              value={inputes.password}
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={submit}
              type="submit"
              className="w-auto px-4 py-2 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-400 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
