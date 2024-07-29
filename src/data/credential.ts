import { dbClient } from "@/lib/db/client";
import { CreateCredential } from "@/types/credentials";

export const createCredential = async (credential: CreateCredential) => {
  return await dbClient.credential.create({ data: { ...credential } });
};
