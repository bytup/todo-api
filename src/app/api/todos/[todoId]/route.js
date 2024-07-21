"use server";
import { promises as fs } from "fs";

export async function GET(request, { params }) {
  const { todoId } = params;
  const file = await fs.readFile(
    process.cwd() + "/src/app/api/todos/todos.json",
    "utf8"
  );
  const todos = JSON.parse(file);

  const todo = todos.find((todo) => todo.id == todoId);
  if (todo) {
    return Response.json({
      message: "Fetched todo successfully",
      status: true,
      data: todo,
    });
  }

  return Response.json({
    message: "Unable to find the todo",
    status: true,
  });
}

export async function PATCH(request, { params }) {
  const { todoId } = params;
  const file = await fs.readFile(
    process.cwd() + "/src/app/api/todos/todos.json",
    "utf8"
  );
  const todos = JSON.parse(file);

  const todoIndex = todos.findIndex((todo) => todo.id == todoId);
  if (todoIndex === -1) {
    return Response.json({ message: "Todo not found", status: false });
  }

  const updatedTodo = await request.json();
  todos[todoIndex] = { ...todos[todoIndex], ...updatedTodo };
  await fs.writeFile(
    process.cwd() + "/src/app/api/todos/todos.json",
    JSON.stringify(todos, null, 2)
  );
  return Response.json({ message: "Todo updated successfully", status: true });
}
