"use server";
import { promises as fs } from "fs";

export async function GET(request) {
  const file = await fs.readFile(
    process.cwd() + "/src/app/api/todos/todos.json",
    "utf8"
  );
  const todos = JSON.parse(file);
  return Response.json({ message: "Hello World", status: true, data: todos });
}

export async function POST(request) {
  const file = await fs.readFile(
    process.cwd() + "/src/app/api/todos/todos.json",
    "utf8"
  );
  const todos = JSON.parse(file);
  const newTodo = await request.json();
  if (!newTodo.title) {
    return Response.json({ message: "Title is required", status: false });
  }

  newTodo.id = todos.length + 1;
  newTodo.completed = false;
  todos.push(newTodo);
  await fs.writeFile(
    process.cwd() + "/src/app/api/todos/todos.json",
    JSON.stringify(todos, null, 2)
  );
  return Response.json({ message: "Todo added successfully", status: true });
}
