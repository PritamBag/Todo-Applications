import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputes, setInputes] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null); 

  const change = (e) => {
    const { name, value } = e.target;
    setInputes({ ...inputes, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:1700/api/signin",
        inputes
      );
      sessionStorage.setItem("id",response.data.others._id);
      dispatch(authActions.login());
      navigate("/tasks");
    } catch (error) {
      console.error("Signin Error:", error);
      setError("Failed to signin. Please check your credentials."); 
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-50">
      {/* Left Side - Heading */}
      <div className="w-full md:w-1/3 flex items-center justify-center mb-8 md:mb-0">
        <h1 className="text-4xl font-bold text-slate-600 md:text-6xl">
          Sign In
        </h1>
      </div>

      {/* Right Side - Signin Form */}
      <div className="w-full md:w-2/3 max-w-md bg-white p-8 rounded-lg shadow-md">
        <form className="w-full" onSubmit={submit}>
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
              value={inputes.email}
              onChange={change}
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
              placeholder="Enter your Password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
              value={inputes.password}
              onChange={change}
            />
          </div>
          {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-auto px-4 py-2 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-400 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
