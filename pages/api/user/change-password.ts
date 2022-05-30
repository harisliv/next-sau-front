import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req });
  console.log(session)

  if (!session) {
    res.status(401).json({ message: "not auth" });
    return;
  }
  const userEmail = session?.user?.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(402).json({ message: "GET OUT" });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const equal = await verifyPassword(oldPassword, currentPassword);

  if (!equal) {
    res.status(403).json({ message: "Wrong password" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword }, }
  );

  client.close();

  res.status(299).json({message: "password updated!"})
}
