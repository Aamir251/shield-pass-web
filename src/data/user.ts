import { dbClient } from "@/lib/db/client";
import { User } from "@prisma/client";

const userDtoMapper = (user: User) => {
  return {
    id: user.id,
    username: user.name,
    email: user.email,
  };
};

export const getUserByEmail = async (email: string) => {
  const user = await dbClient.user.findUnique({ where: { email } });
  return user ? userDtoMapper(user) : null;
};

export type NewUser = {
  name: string;
  email: string;
  password: string;
  sharedPublicKey : string
  sharedPrivateKey : {
    iv : string
    salt : string
    data : string
  }
};

export const createNewUser = async ({ name, email, password, sharedPublicKey, sharedPrivateKey }: NewUser) => {
  return await dbClient.user.create({ data: { name, email, password, sharedPublicKey, sharedPrivateKey } });
};

export const getCompleteUser = async (email: string) =>
  await dbClient.user.findUnique({ where: { email } });


export const getRecipientPublicKey = async(email : string) =>
  await dbClient.user.findUnique({ where : { email }, select : { sharedPublicKey : true, id : true } })