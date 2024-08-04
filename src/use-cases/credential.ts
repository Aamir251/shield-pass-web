import {
  createCredential,
  getCredentialById,
  getCredentials,
} from "@/data/credential";
import { getUserByEmail } from "@/data/user";
import { CreateCredential } from "@/types/credentials";
import { getServerSession } from "next-auth";

export const createCredentialUseCase = async (
  email: string,
  credential: Omit<CreateCredential, "userId">
) => {
  const userExists = await getUserByEmail(email);

  if (!userExists) throw new Error("Invalid User");

  await createCredential({ ...credential, userId: userExists.id });
};

export const getAllCredentialUseCase = async (email: string) => {
  const userExists = await getUserByEmail(email);

  if (!userExists) throw new Error("User Does not Exist");

  return await getCredentials(userExists.id);
};

export const getCredentialByIdUseCase = async (
  credentialId: string | undefined | null
) => {
  if (!credentialId) return null;

  return await getCredentialById(credentialId);
};
