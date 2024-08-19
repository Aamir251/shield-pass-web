import { getServerSession, User } from "next-auth";
import { getCompleteUser } from "@/data/user";
import bcrypt from "bcrypt";

export const authenticateUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  console.log({ email, password });

  try {
    const userExists = await getCompleteUser(email);

    console.log({ userExists });

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

  if (!session?.user?.email) throw new Error("Session Expired");

  return session.user;
};
