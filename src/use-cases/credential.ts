import { CREDENTIAL_CATEGORIES } from "@/constants";
import {
  createCredential,
  deleteCredential,
  getCredentialById,
  getCredentials,
  updateCredential,
} from "@/data/credential";

import { getUserByEmail } from "@/data/user";
import { CreateCredential } from "@/types/credentials";
import { Credential } from "@prisma/client";

export const createCredentialUseCase = async (
  email: string,
  credential: Omit<CreateCredential, "userId">
) => {
  const userExists = await getUserByEmail(email);

  if (!userExists) throw new Error("Invalid User");

  await createCredential({ ...credential, userId: userExists.id });
};

export const getAllCredentialUseCase = async (
  email: string,
  category: string,
  type: string
) => {
  const userExists = await getUserByEmail(email);

  if (!userExists) throw new Error("User Does not Exist");

  if (!category || !CREDENTIAL_CATEGORIES.includes(category)) {
    throw new Error("Invalid Category");
  }

  const credentialCategory =
    category.charAt(0).toUpperCase() + category.slice(1);
  const credentialType = type.charAt(0).toUpperCase() + type.slice(1);

  return await getCredentials(
    userExists.id,
    credentialCategory,
    credentialType
  );
};

export const getCredentialByIdUseCase = async (
  credentialId: string | undefined | null,
  email: string
) => {
  if (!credentialId || !email) return null;

  const userExists = await getUserByEmail(email);

  if (!userExists) throw new Error("User Not Found");

  return await getCredentialById(credentialId, userExists.id);
};

export const updateCredentialUseCase = async (
  email: string,
  propertiesToUpdate: Partial<Credential>,
  credentialId: string
) => {
  if (!credentialId || !email) return null;

  const userExists = await getUserByEmail(email);

  if (!userExists) throw new Error("User Not Found");

  return await updateCredential(
    propertiesToUpdate,
    userExists.id,
    credentialId
  );
};

export const deleteCredentialUseCase = async (
  email: string,
  credentialId: string
) => {
  if (!credentialId || !email) return null;

  const userExists = await getUserByEmail(email);

  if (!userExists) throw new Error("User Not Found");

  return await deleteCredential(credentialId, userExists.id);
};
