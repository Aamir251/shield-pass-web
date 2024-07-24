import { User } from "next-auth";
import { dbClient } from "../db/client";
import bcrypt from "bcrypt";
import { getUserByEmail } from "@/data/user";

export const authenticateUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const userExists = await getUserByEmail(email);

  if (!userExists) throw new Error("User Not Found");

  // verify password

  const passwordMatch = await bcrypt.compare(password, userExists.password);

  if (!passwordMatch) throw new Error("Invalid Password");

  return {
    id: userExists.id,
    email: userExists.email,
    name: userExists.name,
  };
};
