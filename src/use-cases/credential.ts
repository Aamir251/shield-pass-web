import { CREDENTIAL_CATEGORIES, CredentialCategory } from "@/constants";
import {
  createCredential,
  deleteCredential,
  deletedSharedCredential,
  getCredentialById,
  getCredentials,
  getMyCredentialRecipients,
  getRecentCredentials,
  getSearchResults,
  updateCredential,
} from "@/data/credential";

import { getUserByEmail } from "@/data/user";
import { CreateCredential, CredentialsType } from "@/types/credentials";
import { Credential } from "@prisma/client";

export const createCredentialUseCase = async (
  email: string,
  credential: Omit<CreateCredential, "sharedWith" | "userId">
) => {
  const userExists = await getUserByEmail(email);

  if (!userExists) throw new Error("Invalid User");


  await createCredential({ ...credential, userId: userExists.id });
};

export const getCredentialsByCategoryUseCase = async (
  email: string,
  category: CredentialCategory,
) => {

  const userExists = await getUserByEmail(email);

  if (!userExists) throw new Error("User Does not Exist");

  if (!category || !CREDENTIAL_CATEGORIES.includes(category)) {
    throw new Error("Invalid Category");
  }


  return await getCredentials(
    userExists.id,
    category,
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


  // if credentialRecipients exists, it means the credential was shared with someone
  const credentialRecipients = await getMyCredentialRecipients(credentialId, userExists.id)

  if (credentialRecipients.length) {
    await deletedSharedCredential(credentialId, userExists.id)
  }

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


export const getRecentCredentialsUsecase = async (email: string) => {

  const userExists = await getUserByEmail(email)
  if (!userExists) throw new Error("User Not Found")

  return await getRecentCredentials(userExists.id)
}

export const searchCredentialUseCase = async (email : string, searchString : string) =>
{
  const userExists = await getUserByEmail(email)
  if (!userExists) throw new Error("User Not Found")
  
  return await getSearchResults(userExists.id, searchString)
}

