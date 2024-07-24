import { dbClient } from "@/lib/db/client";

export const getUserByEmail = async (email: string) => {
  return await dbClient.user.findUnique({ where: { email } });
};

type NewUser = {
  name: string;
  email: string;
  password: string;
};

export const createNewUser = async ({ name, email, password }: NewUser) => {
  return await dbClient.user.create({ data: { name, email, password } });
};
