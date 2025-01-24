import { getServerSession, User } from "next-auth";
import { getCompleteUser } from "@/data/user";
import bcrypt from "bcrypt";
import { ERRORS } from "@/constants";

export const authenticateUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const userExists = await getCompleteUser(email);

    if (!userExists) throw new Error("Invalid Email");

    // verify password

    const passwordMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordMatch) throw new Error("Invalid Password");

    return {
      ...userExists,
    };
  } catch (error) {
    console.log({ error });

    return null;
  }
};

export const checkIfSessionExists = async () => {
  const session = await getServerSession();

  if (!session?.user?.email) throw new Error(ERRORS.SESSION_EXPIRED);

  return session.user;
};
