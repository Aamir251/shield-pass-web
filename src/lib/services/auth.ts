import { User } from "next-auth";
import { dbClient } from "../db/client";
import bcrypt from "bcrypt";

export const authenticateUser = async (
  email: string,
  password: string
): Promise<User | null> => {
 
    const userExists = await dbClient.user.findUnique({ where: { email } });

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
