import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";


export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollenction = client.db().collection("users");
        const user = await usersCollenction.findOne({
          email: credentials?.email,
        });

        if (!user) {
          throw new Error("no user found");
        }

        const isValid = await verifyPassword(
          credentials?.password,
          user.password
        );
        if (!isValid) {
          client.close();

          throw new Error("Wrong Credentials!");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
  secret: "2d0a310188aaabf4772fe134e6cba907"
});
