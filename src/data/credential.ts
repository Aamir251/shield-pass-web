import { dbClient } from "@/lib/db/client";
import { CreateCredential, CredentialBasic } from "@/types/credentials";
import { Credential } from "@prisma/client";

export const createCredential = async (credential: CreateCredential) => {
  return await dbClient.credential.create({ data: { ...credential } });
};

export const getCredentials = async (userId: string, category : string) => {
  return await dbClient.credential.findMany({
    where: { userId, category },
    select: {
      name: true,
      email: true,
      id: true,
      category: true,
      websiteUrl: true,
    },
  });
};

export const getCredentialById = async (credentialId: string) => {
  return await dbClient.credential.findUnique({ where: { id: credentialId } });
};
