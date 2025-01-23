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


type EncryptedKey = {
  iv : string
  salt : string
  data : string
}
export type NewUser = {
  name: string;
  email: string;
  password: string;
  sharedPublicKey : string
  sharedPrivateKey : EncryptedKey

  encryptionKeyMain : EncryptedKey

  encryptionKeyRecovery : EncryptedKey
};

export const createNewUser = async (user: NewUser) => {
  return await dbClient.user.create({ data: { ...user  } });
};

export const getCompleteUser = async (email: string) =>
  await dbClient.user.findUnique({ where: { email } });


export const getRecipientPublicKey = async(email : string) =>
  await dbClient.user.findUnique({ where : { email }, select : { sharedPublicKey : true, id : true } })

export const getMainEncryptionKey = async (email : string) =>
  await dbClient.user.findUnique({ where : { email }, select : { encryptionKeyMain : true} })