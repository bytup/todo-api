"use server";
import { promises as fs } from "fs";

export async function GET(request, { params }) {
  const { userId } = params;
  const file = await fs.readFile(
    process.cwd() + "/src/app/api/users/users.json",
    "utf8"
  );
  const users = JSON.parse(file);

  const user = users.find((user) => user.id == userId);
  if (user) {
    return Response.json({
      message: "Fetched user successfully",
      status: true,
      data: user,
    });
  }

  return Response.json({
    message: "Unable to find the user",
    status: true,
  });
}

export async function PATCH(request, { params }) {
  const { userId } = params;
  const file = await fs.readFile(
    process.cwd() + "/src/app/api/users/users.json",
    "utf8"
  );
  const users = JSON.parse(file);

  const userIndex = users.findIndex((user) => user.id == userId);
  if (userIndex === -1) {
    return Response.json({ message: "User not found", status: false });
  }

  const updatedUser = await request.json();
  users[userIndex] = { ...users[userIndex], ...updatedUser };
  await fs.writeFile(
    process.cwd() + "/src/app/api/users/users.json",
    JSON.stringify(users, null, 2)
  );
  return Response.json({ message: "User updated successfully", status: true });
}

export async function DELETE(request, { params }) {
  const { userId } = params;
  const file = await fs.readFile(
    process.cwd() + "/src/app/api/users/users.json",
    "utf8"
  );
  const users = JSON.parse(file);

  const userIndex = users.findIndex((user) => user.id == userId);
  if (userIndex === -1) {
    return Response.json({ message: "User not found", status: false });
  }

  users.splice(userIndex, 1);
  await fs.writeFile(
    process.cwd() + "/src/app/api/users/users.json",
    JSON.stringify(users, null, 2)
  );
  return Response.json({ message: "User deleted successfully", status: true });
}
