"use client";

import React, { useEffect, useState } from "react";

import Todo from "./components/Todo";

const Page = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);

  function fetchTodos() {
    fetch("http://localhost:3000/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data?.data));
  }

  useEffect(() => {
    // Component Did Mount
    fetchTodos();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newTodo = {
      title: todoText,
    };
    fetch("http://localhost:3000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }).then(() => fetchTodos());
    setTodoText("");
  };

  const toggleStatus = (id: number, completed: boolean) => {
    fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: !completed,
      }),
    }).then(() => fetchTodos());
  };

  return (
    <div className="p-4">
      <h2>Todo Application</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={todoText}
          type="text"
          placeholder="Enter Todo"
          className="border-4 p-2 rounded-lg w-full my-4"
          onChange={(e) => {
            setTodoText(e.target.value);
          }}
        />

        <button
          type="submit"
          className="bg-slate-900 text-white px-4 py-2 mb-4 rounded-lg"
        >
          Add Todo
        </button>
      </form>

      <div className="space-y-2">
        {todos.map((todo: any) => (
          <Todo
            key={todo.id}
            title={todo.title}
            completed={todo.completed}
            onClick={() => toggleStatus(todo.id, todo.completed)}
          />
        ))}
      </div>
      {/* <Todo title={TODO.title} completed={TODO.completed} /> */}
    </div>
  );
};

export default Page;
