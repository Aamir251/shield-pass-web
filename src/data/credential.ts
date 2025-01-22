import { dbClient } from "@/lib/db/client";
import { hashPassword } from "@/lib/helpers/utils";
import { CreateCredential, CredentialsType } from "@/types/credentials";





export const createCredential = async (credential: CreateCredential) => {
  return await dbClient.credential.create({ data: { ...credential } });
};

export const getCredentials = async (
  userId: string,
  category: string,
) => {
  return await dbClient.credential.findMany({
    where: { userId, category },
    select: {
      name: true,
      email: true,
      id: true,
      category: true,
      websiteUrl: true,
      updatedAt: true,
      password: true
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
  ownerId: string,
  recipientId: string,
  credentialId: string,
  password: string
) => {

  await dbClient.sharedCredential.create({
    data: {
      credentialId,
      password,
      ownerId,
      recipientId
    }
  })
};

/**
 * Gets the list of people with whom a user has shared his/her credentials
 */
export const getMyCredentialRecipients = async (
  credentialId: string,
  ownerId: string
) => {


  const resp = await dbClient.sharedCredential.findMany({
    where : {
      credentialId,
      ownerId
    },
    select : {
      recipient : {
        select : {
          email : true
        }
      }
    }
  })

  return resp.map(el => ({ email : el.recipient.email }))
  

};

/**
 * Gets the list of credentials that was shared to a User
 */

type SharedCredentialRaw = {
  credential: {
    name: string;
    username: string;
    email: string;
    category: string;
    websiteUrl: string;
    updatedAt: Date;
  };
  password: string;
  id: string;
}


function sharedCredentialDto(credentials:SharedCredentialRaw[] ) {

  return credentials.map(({ id, password, credential: { email, category, name, updatedAt, username, websiteUrl } }) => ({
    id,
    name,
    email,
    websiteUrl,
    category,
    username,
    updatedAt,
    password 
  }))

}


export const getCredentialsSharedWithMe = async (userId: string) => {

  const credentials =  await dbClient.sharedCredential.findMany({
    where: {
      recipientId: userId,

    },
    select: {
      password: true,
      id: true,
      credential: {
        select: {
          name: true,
          email: true,
          websiteUrl: true,
          category: true,
          username: true,
          updatedAt: true
        }
      }
    },
  })

  const sharedPrivateKey = await dbClient.user.findUnique({
    where : {
      id : userId,
    },
    select : {
      sharedPrivateKey : true
    }
  })

  return {
    credentials : sharedCredentialDto(credentials),
    sharedPrivateKey : sharedPrivateKey?.sharedPrivateKey
  }

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
      updatedAt: true,
      password: true
    }
  })
}


export const removeCredentialAccess = async (ownerId: string, recipientId: string) => {

  return await dbClient.sharedCredential.delete({
    where : {
      ownerId,
      recipientId,
    }
  })
}


export const getSearchResults = async (userId: string, searchString: string) => {

  return await dbClient.credential.findMany({
    where: {
      OR: [
        { name: { contains: searchString, mode: "insensitive" } },
        { websiteUrl: { contains: searchString, mode: "insensitive" } },
        { username: { contains: searchString, mode: "insensitive" } },
        { email: { contains: searchString, mode: "insensitive" } },
      ],

      AND: {
        userId,
      }
    },

    select: {
      websiteUrl: true,
      name: true,
      email: true,
      id: true,
      category: true
    }
  })


  // try {
  //   if (!ObjectId.isValid(userId)) {
  //     throw new Error('Invalid userId format');
  //   }

  //   // Create ObjectId instance
  //   const ownerId = new ObjectId(userId);


  //   const creds = await dbClient.credential.findRaw({
  //     filter: { 
  //       userId: { $eq: ownerId.toString() } // Pass userId directly if it's a string
  //     }
  //   })

  //   return creds
  // } catch (error) {

  //   console.log({ error });

  // }

  // return []



}