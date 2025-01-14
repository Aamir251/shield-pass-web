import {
  getCredentialsSharedWithMe,
  getMyCredentialRecipients,
  getSingleSharedCredential,
  removeCredentialAccess,
  shareCredential,
} from "@/data/credential";
import { getUserByEmail } from "@/data/user";

export const shareCredentialUseCase = async (
  ownerEmail: string,
  receiverEmail: string,
  credentialId: string,
  password : string
) => {

  const receiverExists = await getUserByEmail(receiverEmail);
  const owner = await getUserByEmail(ownerEmail);

  if (!receiverExists) throw new Error("User does not exist");

  return await shareCredential(owner?.id!, receiverExists.id, credentialId, password);
};

export const getMyCredentialRecipientsUseCase = async (
  credentialId: string,
  currentUserEmail: string
) => {
  return await getMyCredentialRecipients(credentialId, currentUserEmail!);
};

export const getSharedCredentialsUseCase = async (email: string) => {
  const userExists = await getUserByEmail(email);

  if (!userExists) throw new Error("User does not exist");

  return await getCredentialsSharedWithMe(userExists.id);
};

export const getSingleSharedCredentialUseCase = async (
  email: string,
  credentialId: string
) => {
  const userExists = await getUserByEmail(email);
  if (!userExists) throw new Error("User does not exist");

  return await getSingleSharedCredential(userExists.id, credentialId);
};


export const removeCredentialAccessUseCase = async (recipientId: string, credentialOwnerEmail: string, credentialId: string) => {

  const owner = await getUserByEmail(credentialOwnerEmail);

  return await removeCredentialAccess(credentialId, owner!.id, recipientId);

}
