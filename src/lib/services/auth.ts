import { getServerSession, User } from "next-auth";
import { getCompleteUser } from "@/data/user";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { NextRequest } from "next/server";

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

  if (!session?.user?.email) throw new Error("Session Expired");

  return session.user;
};


export const signJWTToken = (email: string, name: string) => {
  return sign({ name, email }, process.env.NEXTAUTH_SECRET!)
}


export const verifyJWTToken = (request: NextRequest) => {
  const token = request.cookies.get("sp-auth-token")?.value

  if (!token) throw Error("Unauthorized")

  // Verify Token

  return verify(token, process.env.NEXTAUTH_SECRET!)
}