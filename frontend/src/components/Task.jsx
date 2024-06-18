import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import Update from "./Update";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import axios from "axios";
let id = sessionStorage.getItem("id");

const Task = () => {
  const [inputs, setInputs] = useState({ title: "", about: "" });
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      await axios.get(`http://localhost:1700/api/getTask/${id}`).then((response) => {
        setTasks(response.data.list);
      });
    };
    fetch();
  }, []);

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);

  const showAbout = () => {
    document.getElementById("about").style.display = "block";
  };

  const showButton = () => {
    document.getElementById("addButton").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async () => {
    if (isUpdating) {
      const updatedTasks = [...tasks];
      updatedTasks[updateIndex] = inputs;
      setTasks(updatedTasks);
      setIsUpdating(false);
      setUpdateIndex(null);
    } else {
      if(id){
        await axios.post("http://localhost:1700/api/createTask",{title:inputs.title, about: inputs.about, id:id}).then((response) => {
          console.log(response);
        });
      }
      setTasks([...tasks, inputs]);
    }
    setInputs({ title: "", about: "" });
    document.getElementById("about").style.display = "none";
    document.getElementById("addButton").style.display = "none";
  };

  const del = async (cardid) => {
    // const updatedTasks = tasks.filter((_, index) => index !== id);
    // setTasks(updatedTasks);
    await axios.delete(`http://localhost:1700/api/deleteTask/${cardid}`, {
      data: {id:id},
    }).then((response) => {
      console.log(response);
    });
  };

  const update = (id) => {
    setIsUpdating(true);
    setUpdateIndex(id);
    setInputs(tasks[id]);
    document.getElementById("todo-update").style.display = "block";
  };

  const cancelUpdate = () => {
    setIsUpdating(false);
    setInputs({ title: "", about: "" });
    document.getElementById("todo-update").style.display = "none";
  };

  const handleUpdate = (updatedInputs) => {
    const updatedTasks = [...tasks];
    updatedTasks[updateIndex] = updatedInputs;
    setTasks(updatedTasks);
    cancelUpdate();
  };

  return (
    <>
      <div className="relative todo min-h-lvh max-h-auto">
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center w-1/4 shadow-lg rounded-md mt-2 p-2">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter title"
              className="w-full px-3 py-2 outline-none mt-4"
              required
              value={inputs.title}
              onChange={change}
              onClick={showAbout}
            />
            <textarea
              id="about"
              name="about"
              placeholder="Enter task details"
              className="w-full hidden px-3 py-2 outline-none mt-4"
              rows="3"
              required
              value={inputs.about}
              onChange={change}
              onClick={showButton}
            />
            <button
              id="addButton"
              onClick={submit}
              className="hidden w-auto px-3 py-1 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-400 focus:outline-none focus:ring focus:ring-blue-300"
            >
              {isUpdating ? "Update" : "Add"}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap mt-3">
          <div className="w-auto h-auto flex flex-col">
            {tasks &&
              tasks.map((item, index) => (
                <div className="col-lg-3 px-5 py-2" key={index}>
                  <TaskCard
                    title={item.title}
                    about={item.about}
                    id={item._id}
                    delid={del}
                    updateid={update}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div
        className="hidden fixed top-20 h-screen bg-slate-500 w-full"
        id="todo-update"
      >
        <div>
          <Update
            inputs={inputs}
            change={change}
            handleUpdate={handleUpdate}
            cancelUpdate={cancelUpdate}
          />
        </div>
      </div>
    </>
  );
};
export default Task;
