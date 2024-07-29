import { createNewUser, getUserByEmail } from "@/data/user";
import bcrypt from "bcrypt";

export const createUserUseCase = async (
  username: string,
  email: string,
  password: string
) => {
  const SALT_ROUNDS = 10;
  const userExists = await getUserByEmail(email);

  if (userExists) throw new Error("User Already Exists");

  const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

  const userToCreate = {
    name: username,
    email,
    password: hashedPassword,
  };
  await createNewUser(userToCreate);
};
