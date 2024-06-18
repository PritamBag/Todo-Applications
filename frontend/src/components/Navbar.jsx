import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
    setIsMobileMenuOpen(false);
  };

  return (
    <div
      className="main h-20 border flex justify-between items-center px-4 md:px-16 bg-gray-100"
      id="home"
    >
      <div>
        <h1 className="text-xl md:text-2xl font-bold">#Todo</h1>
      </div>

      <div className="hidden md:flex space-x-4 lg:space-x-6 cursor-pointer">
        <Link to="/" className="hover:text-orange-600">
          Home
        </Link>
        <Link to="/tasks" className="hover:text-orange-600">
          Task
        </Link>
      </div>

      <div className="hidden md:block space-x-2">
        {!isLoggedIn ? (
          <>
            <Link
              to="/signup"
              className="px-4 py-2 bg-orange-500 rounded-full shadow text-sm text-white"
            >
              Sign Up
            </Link>
            <Link
              to="/signin"
              className="px-4 py-2 bg-orange-500 rounded-full shadow text-sm text-white"
            >
              Sign In
            </Link>
          </>
        ) : (
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-orange-500 rounded-full shadow text-sm text-white"
          >
            Sign Out
          </button>
        )}
      </div>

      <button
        className="md:hidden flex items-center px-3 py-2 border rounded text-gray-700 border-gray-400 hover:text-orange-600 hover:border-orange-600"
        onClick={toggleMobileMenu}
      >
        Menu
      </button>

      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-gray-100 border-t md:hidden flex flex-col items-center space-y-2 py-4 cursor-pointer">
          <Link
            to="/"
            className="hover:text-orange-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/tasks"
            className="hover:text-orange-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Task
          </Link>
          {!isLoggedIn ? (
            <>
              <Link
                to="/signup"
                className="px-4 py-2 bg-orange-500 rounded-full shadow text-sm text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
              <Link
                to="/signin"
                className="px-4 py-2 bg-orange-500 rounded-full shadow text-sm text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-orange-500 rounded-full shadow text-sm text-white"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
