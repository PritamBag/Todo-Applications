import React from "react";

const Home = () => {
  return (
    <div className="main-container flex flex-col items-center justify-center h-screen py-10 px-4 md:px-16">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">
        Welcome to Todo Application
      </h1>
      <p className="text-lg md:text-xl text-center mb-6">
        Manage your tasks efficiently and stay organized with our new Todo App.
      </p>
      <button className="px-6 py-3 bg-orange-500 rounded-full shadow text-white text-lg">
        Get Started
      </button>
    </div>
  );
};

export default Home;
