import { CREDENTIAL_CATEGORIES } from "@/constants/categories";
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

export const getAllCredentialUseCase = async (email: string, category: string) => {
  const userExists = await getUserByEmail(email);

  if (!userExists) throw new Error("User Does not Exist");

  if (!category || !CREDENTIAL_CATEGORIES.includes(category)) {
    throw new Error("Invalid Category");
  }


  const credentialCategory = category.charAt(0).toUpperCase() + category.slice(1);
  return await getCredentials(userExists.id, credentialCategory);
};

export const getCredentialByIdUseCase = async (
  credentialId: string | undefined | null
) => {
  if (!credentialId) return null;

  return await getCredentialById(credentialId);
};
