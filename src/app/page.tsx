import React from "react";

import Todo from "./components/Todo";

const page = () => {
  const TODO = {
    id: 1,
    title: "I need to learn ReactJS",
    completed: true,
  };

  return (
    <div className="p-4">
      <h2>Todo Application</h2>

      <Todo title={TODO.title} completed={TODO.completed} />
    </div>
  );
};

export default page;
