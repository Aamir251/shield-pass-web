import { Credential } from "@prisma/client";

export type CredentialsType = "private" | "work" | "business";

export type CreateCredential = Omit<Credential, "id">;
