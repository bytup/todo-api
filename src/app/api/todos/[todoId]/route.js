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
