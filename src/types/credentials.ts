import { Credential } from "@prisma/client";

export type CredentialsType = "private" | "work" | "business";

export type CreateCredential = Omit<Credential, "id">;

export type CredentialBasic = Pick<
  Credential,
  "email" | "name" | "category" | "id" | "websiteUrl"
>;
