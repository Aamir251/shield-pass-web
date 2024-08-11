import { dbClient } from "@/lib/db/client";
import { CreateCredential } from "@/types/credentials";

export const createCredential = async (credential: CreateCredential) => {
  return await dbClient.credential.create({ data: { ...credential } });
};

export const getCredentials = async (userId: string, category: string) => {
  return await dbClient.credential.findMany({
    where: { userId, category },
    select: {
      name: true,
      email: true,
      id: true,
      category: true,
      websiteUrl: true,
      type : true
    },
  });
};

export const getCredentialById = async (
  credentialId: string,
  userId: string
) => {
  return await dbClient.credential.findUnique({
    where: { id: credentialId, userId },
  });
};

export const updateCredential = async (
  propertiesToUpdate: Partial<Credential>,
  userId: string,
  credentialId: string
) => {
  return await dbClient.credential.update({
    data: { ...propertiesToUpdate },
    where: { userId, id: credentialId },
  });
};


export const deleteCredential = async (credentialId : string, userId : string) => {
  return await dbClient.credential.delete({ where : { id : credentialId, userId }})
}
