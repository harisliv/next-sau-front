import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;
  const { email, password, name, surname } = data;
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7 ||
    !name ||
    name.trim().length < 4 ||
    !surname ||
    surname.trim().length < 4
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    return;
  }
  const client = await connectToDatabase();
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "User already exists" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
    name: name,
    surname: surname
  });

  res.status(201).json({ message: "Created user!" });
  client.close();
}

