export const CREDENTIAL_CATEGORIES = ["websites", "applications", "emails", "socials", "cloud", "finance", "ecommerce" ] as const;

export const BASE_URL = "/recents";


export const CREDENTIAL_PAGE_CATEGORIES = [...CREDENTIAL_CATEGORIES, "recents", "shared"] as const;



export type CredentialCategory = typeof CREDENTIAL_CATEGORIES[number]

export type CredentialCategoryPageType = typeof CREDENTIAL_PAGE_CATEGORIES[number]


export enum ERRORS {
  SESSION_EXPIRED = "Session Expired"
}