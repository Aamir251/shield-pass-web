import { getMyCredentialRecipients, shareCredential } from "@/data/credential";
import { getUserByEmail } from "@/data/user";

export const shareCredentialUseCase = async (
  ownerEmail: string,
  receiverEmail: string,
  credentialId: string
) => {
  const receiverExists = await getUserByEmail(receiverEmail);

  if (!receiverExists) throw new Error("User does not exist");

  return await shareCredential(ownerEmail, receiverExists.id, credentialId);
};

export const getMyCredentialRecipientsUseCase = async (
  credentialId: string,
  currentUserEmail: string
) => {
  return await getMyCredentialRecipients(credentialId, currentUserEmail!);
};
