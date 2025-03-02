import { Credential } from "@prisma/client";

export type CredentialsType = "Personal" | "Work" | "Business";

export type CreateCredential = Omit<Credential, "id" | "sharedWith" | "createdAt" | "updatedAt">;

export type CredentialBasic = Pick<
  Credential,
  "email" | "name" | "category" | "id" | "websiteUrl" | "updatedAt" | "password" | "username"
>;


export type UpdateCredential = Partial<CreateCredential>


export type CredentialUpdate = CreateCredential


export type CredentialSearchItem = Pick<Credential, "id" | "name" | "websiteUrl" | "email" | "category">
