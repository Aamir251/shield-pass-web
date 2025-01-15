export const CREDENTIAL_CATEGORIES = ["websites", "applications", "emails", "socials", "cloud", "finance", "ecommerce" ] as const;

export const BASE_URL = "/recents";


export const CREDENTIAL_PAGE_CATEGORIES = [...CREDENTIAL_CATEGORIES, "recents", "shared"] as const;



export type CredentialCategory = typeof CREDENTIAL_CATEGORIES[number]

export type CredentialCategoryPageType = typeof CREDENTIAL_PAGE_CATEGORIES[number]


export type CredentialSharedWithMe = {
  id : string
  password: string;
  credential: {
      name : string
      email: string;
      username: string;
      category: string;
      websiteUrl: string;
      updatedAt : Date
  };
}


export enum ERRORS {
  SESSION_EXPIRED = "Session Expired"
}




export enum LOCALSTORAGE_KEYS {
  PRIVATE_KEY = "sp-private-key",
  ENCRYPTION_KEY = "sp-encryption-key"
}