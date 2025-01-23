import {
  getCredentialsSharedWithMe,
  getMyCredentialRecipients,
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
  ownerEmail: string
) => {
  const owner = await getUserByEmail(ownerEmail)

  return await getMyCredentialRecipients(credentialId, owner?.id!);
};

export const getSharedCredentialsUseCase = async (email: string) => {
  const userExists = await getUserByEmail(email);

  if (!userExists) throw new Error("User does not exist");

  return await getCredentialsSharedWithMe(userExists.id);
};



export const removeCredentialAccessUseCase = async (recipientEmail: string, credentialOwnerEmail: string) => {

  const owner = await getUserByEmail(credentialOwnerEmail);

  const recipient = await getUserByEmail(recipientEmail)

  console.log({ owner, recipient})
  return await removeCredentialAccess( owner!.id, recipient?.id!);

}
