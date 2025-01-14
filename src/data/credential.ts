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
      updatedAt : true,
      iv : true,
      password : true
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
  password : string
) => {
  
  await dbClient.sharedCredential.create({
    data : {
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

  const resp = await dbClient.user.findMany({
    where : {
      SharedCredential : {
        every : {
          credentialId : credentialId,
          AND : {
            ownerId : ownerId
          },
        },
      }
    },
    select : {
      email : true
    }
  })
  
};

/**
 * Gets the list of credentials that was shared to a User
 */
export const getCredentialsSharedWithMe = async (userId: string) => {


  return [];

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
      updatedAt : true,
      iv : true,
      password : true
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


export const getSearchResults = async (userId : string, searchString : string ) => {

  return await dbClient.credential.findMany({
    where : {
      OR : [
        { name : { contains : searchString, mode : "insensitive"} },
        { websiteUrl : { contains : searchString, mode : "insensitive" } },
        { username : { contains : searchString, mode : "insensitive" } },
        { email : { contains : searchString, mode : "insensitive" } },
      ],
      
      AND : {
        userId,
      }
    },

    select : {
      websiteUrl : true,
      name : true,
      email : true,
      id : true,
      category : true
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