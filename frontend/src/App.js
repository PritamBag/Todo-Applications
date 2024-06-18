import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Task from "./components/Task";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { useDispatch } from "react-redux";
import { authActions } from "./store";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App = () => {
  
  const dispatch = useDispatch();
  useEffect(() =>{
    const id = sessionStorage.getItem("id");
    if(id){
    dispatch(authActions.login());
    }
  });
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/tasks" element={<Task />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
