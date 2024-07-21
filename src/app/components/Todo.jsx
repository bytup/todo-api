import React from "react";

const Todo = ({ title, completed, onClick }) => {
  return (
    <div onClick={onClick}>
      <div className="todo border-2 p-4 rounded-lg flex justify-between cursor-pointer">
        <h3 className="font-semibold">{title}</h3>
        {/* Below we are using ternary operator to conditionally render text */}
        {completed ? (
          <p className="text-green-500">Completed</p>
        ) : (
          <p className="text-red-500">Not Completed</p>
        )}
      </div>
    </div>
  );
};

export default Todo;
