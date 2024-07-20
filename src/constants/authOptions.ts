import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { dbClient } from "../../lib/db/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { authenticateUser } from "../../lib/services/auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(dbClient),
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        return await authenticateUser(credentials.email, credentials.password);
      },
    }),
  ],
};
