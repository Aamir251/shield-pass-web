import { createNewUser, getUserByEmail, NewUser } from "@/data/user";
import bcrypt from "bcrypt";

export const createUserUseCase = async ({ name, email, password, sharedPublicKey, sharedPrivateKey } : NewUser) => {


  const SALT_ROUNDS = 10;
  const userExists = await getUserByEmail(email);
  
  if (userExists) throw new Error("User Already Exists");

  const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

  const userToCreate = {
    name,
    email,
    password: hashedPassword,
    sharedPublicKey,
    sharedPrivateKey
  };
  
  await createNewUser(userToCreate);
};

