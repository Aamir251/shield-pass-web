import { Credential } from "@prisma/client";

export type CredentialsType = "Personal" | "Work" | "Business";

export type CreateCredential = Omit<Credential, "id" | "sharedWith" | "createdAt" | "updatedAt">;

export type CredentialBasic = Pick<
  Credential,
  "email" | "name" | "category" | "id" | "websiteUrl" | "updatedAt" | "iv" | "password"
>;


export type CredentialUpdate = CreateCredential