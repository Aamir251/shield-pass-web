import { dbClient } from "@/lib/db/client";
import { User } from "@prisma/client";

type EncryptedKey = {
  iv : string
  salt : string
  data : string
}
export type NewUser = {
  name: string;
  email: string;
  password: string;
  schoolName : string
  sharedPublicKey : string
  sharedPrivateKey : EncryptedKey

  encryptionKeyMain : EncryptedKey

  encryptionKeyRecovery : EncryptedKey
};



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



export const createNewUser = async (user: NewUser) => {
  return await dbClient.user.create({ data: { ...user  } });
};

export const getCompleteUser = async (email: string) =>
  await dbClient.user.findUnique({ where: { email } });


export const getRecipientPublicKey = async(email : string) =>
  await dbClient.user.findUnique({ where : { email }, select : { sharedPublicKey : true, id : true } })

export const getMainEncryptionKey = async (email : string) =>
  await dbClient.user.findUnique({ where : { email }, select : { encryptionKeyMain : true} })


export const getUserBySchoolName = async( email : string, schoolName : string) => 
  await dbClient.user.findUnique({ 
    where : { email, schoolName }, 
    select : { encryptionKeyRecovery : true, encryptionKeyMain : true } 
  })

  
export const getUserSchoolName = async( email : string ) => 
  await dbClient.user.findUnique({ 
    where : { email }, 
    select : { schoolName : true, email : true, id : true } 
  })


export const updateUser = async (email : string, password : string) => 
  await dbClient.user.update({
    where : {
      email,
    },
    data : {
      password
    }
  })