"use server";
import { promises as fs } from "fs";

export async function GET(request) {
  const file = await fs.readFile(
    process.cwd() + "/src/app/api/users/users.json",
    "utf8"
  );
  const users = JSON.parse(file);
  return Response.json({ message: "Hello World", status: true, data: users });
}

export async function POST(request) {
  const file = await fs.readFile(
    process.cwd() + "/src/app/api/users/users.json",
    "utf8"
  );
  const users = JSON.parse(file);
  const newUser = await request.json();
  if (!newUser.email) {
    return Response.json({ message: "email is required", status: false });
  }

  newUser.id = users.length + 1;
  users.push(newUser);
  await fs.writeFile(
    process.cwd() + "/src/app/api/users/users.json",
    JSON.stringify(users, null, 2)
  );
  return Response.json({ message: "User added successfully", status: true });
}
