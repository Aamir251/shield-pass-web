import { dbClient } from "@/lib/db/client";
import { hashPassword } from "@/lib/helpers/utils";
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
        select: { email: true, id: true },
      })
    )
  );

  return recipients;
};

/**
 * Gets the list of credentials that was shared to a User
 */
export const getCredentialsSharedWithMe = async (userId: string) => {
  const sharedCredentials = await dbClient.credential.findMany({
    where: { sharedWith: { has: userId } },
    select: {
      name: true,
      email: true,
      password: true,
      websiteUrl: true,
      id: true,
    },
  });

  const credentials = await Promise.all(
    sharedCredentials.map(async (cred) => {
      const hashedPassword = await hashPassword(cred.password);
      return {
        ...cred,
        password: hashedPassword,
      };
    })
  );

  return credentials;
};

export const getSingleSharedCredential = async (
  userId: string,
  credentialId: string
) => {
  const credential = await dbClient.credential.findUnique({
    where: { id: credentialId, sharedWith: { has: userId } },
    select: {
      name: true,
      email: true,
      password: true,
      websiteUrl: true,
    },
  });

  if (!credential) return null;

  const hashedPassword = await hashPassword(credential?.password);

  return {
    ...credential,
    password: hashedPassword,
  };
};


export const getRecentCredentials = async (userId: string) => {
  return await dbClient.credential.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
    select: {
      name: true,
      email: true,
      id: true,
      category: true,
      websiteUrl: true,
      type: true,
    }
  })
}


export const removeCredentialAccess = async (credentialId: string, ownerId: string, recipientId: string) => {

  const recepientsIds = await dbClient.credential.findUnique({
    where: { id: credentialId, userId: ownerId },
    select: { sharedWith: true }
  })

  const filteredRecipients = recepientsIds?.sharedWith.filter(id => id !== recipientId)

  return await dbClient.credential.update({
    where: { id: credentialId, userId: ownerId },
    data: { sharedWith: { set: filteredRecipients } }
  })
}