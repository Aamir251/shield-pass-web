import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    name: string | null;
  }

  interface Session extends DefaultSession {
    id: string | null;
  }
}
