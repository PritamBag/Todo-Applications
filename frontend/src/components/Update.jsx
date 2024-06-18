import React from "react";

const Update = ({ inputs, change, handleUpdate, cancelUpdate }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(inputs);
  };

  return (
    <div className="p-16 flex justify-center">
      <div className="w-full md:w-1/3 flex flex-col justify-center space-y-3">
        <p className="text-3xl">Update Your Task</p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="p-2"
            value={inputs.title}
            onChange={change}
          />
          <textarea
            name="about"
            placeholder="About"
            rows="2"
            className="p-2"
            value={inputs.about}
            onChange={change}
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="w-full md:w-1/4 px-3 py-1 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-400 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Update
            </button>
            <button
              type="button"
              onClick={cancelUpdate}
              className="w-full md:w-1/4 px-3 py-1 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-400 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Update;
