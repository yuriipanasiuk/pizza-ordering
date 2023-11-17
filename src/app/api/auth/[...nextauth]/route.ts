import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "@/app/models/User";
import clientPromise from "@/app/lib/mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.SECRET,

  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@mail.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any) {
        if (!credentials.email || !credentials.password) return null;

        await mongoose.connect(MONGODB_URI);

        const { email, password } = credentials;

        const user: any = await User.findOne({ email });
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!user || !isPasswordValid) return null;

        return user;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
