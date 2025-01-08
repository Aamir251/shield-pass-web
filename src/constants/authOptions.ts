import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { dbClient } from "../lib/db/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { authenticateUser } from "../lib/services/auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(dbClient),
  session: { strategy: "jwt" },

  secret: process.env.NEXTAUTH_SECRET as string,

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // for login purposes
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        return await authenticateUser(credentials.email, credentials.password);
      },
    }),
  ],

  callbacks : {
    async jwt({ account, token, user }) {
      
      if (token && user) {
        token.email = user.email
        token.name = user.name
        token.id = user.id
      }

      return token
    },


    async session({ session, token }) {
      
      session.user!.email = token.email
      session.user!.name = token.name
      session.id = token.id as string
      return session
    },


    async redirect({ url, baseUrl }) {

      if (url === baseUrl + "/login") {
        // means no redirect is present
        return baseUrl + "/recents"
      }

      return url
    }
  }

  // callbacks: {
  //   async jwt({ token, user, account }) {
  //     // Runs for the first time while logging in
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     if (account) {
  //       token.accessToken = account.access_token;
  //     }
  //     return token;
  //   },
  // },
};
