import { User } from "next-auth";
import { getCompleteUser } from "@/data/user";
import bcrypt from "bcrypt";

export const authenticateUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const userExists = await getCompleteUser(email);

  if (!userExists) throw new Error("User Not Found");

  // verify password

  const passwordMatch = await bcrypt.compare(password, userExists.password);
  if (!passwordMatch) throw new Error("Invalid Password");

  return {
    ...userExists,
  };
};
