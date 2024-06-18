import React from "react";

const TaskCard = ({ title, about, id, delid, updateid }) => {
  return (
    <div className="border border-black p-2">
      <div>
        <p className="text-xl font-bold">{title}</p>
        <p>{about}</p>
      </div>
      <div className="flex flex-row p-1 space-x-3">
        <div
          className="text-slate-600 font-bold hover:shadow-lg hover:bg-blue-300 p-1 rounded-sm cursor-pointer"
          onClick={() => updateid(id)}
        >
          Update
        </div>
        <div
          className="text-orange-400 font-bold hover:shadow-lg hover:bg-blue-300 p-1 rounded-sm cursor-pointer"
          onClick={() => delid(id)}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
