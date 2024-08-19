import { dbClient } from "@/lib/db/client";
import { CreateCredential } from "@/types/credentials";

export const createCredential = async (credential: CreateCredential) => {
  return await dbClient.credential.create({ data: { ...credential } });
};

export const getCredentials = async (
  userId: string,
  category: string,
  type: string
) => {
  return await dbClient.credential.findMany({
    where: { userId, category, type },
    select: {
      name: true,
      email: true,
      id: true,
      category: true,
      websiteUrl: true,
      type: true,
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

export const deleteCredential = async (
  credentialId: string,
  userId: string
) => {
  return await dbClient.credential.delete({
    where: { id: credentialId, userId },
  });
};

export const shareCredential = async (
  ownerEmail: string,
  receiverId: string,
  credentialId: string
) => {
  return await dbClient.credential.update({
    where: { id: credentialId, user: { email: ownerEmail } },
    data: { sharedWith: { push: receiverId } },
  });
};

/**
 * Gets the list of people with whom a user has shared his/her credentials
 */
export const getMyCredentialRecipients = async (
  credentialId: string,
  ownerEmail: string
) => {
  const recepientsIds = await dbClient.credential.findUnique({
    where: { id: credentialId, user: { email: ownerEmail } },
    select: { sharedWith: true },
  });

  if (!recepientsIds?.sharedWith.length) return [];

  const recipients = await Promise.all(
    recepientsIds.sharedWith.map(async (recepientsId) =>
      dbClient.user.findUnique({
        where: { id: recepientsId },
        select: { email: true },
      })
    )
  );

  return recipients;
};
