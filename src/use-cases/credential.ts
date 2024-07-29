import { createCredential } from "@/data/credential";
import { getUserByEmail } from "@/data/user";
import { CreateCredential } from "@/types/credentials";

export const createCredentialUseCase = async (
  email: string,
  credential: Omit<CreateCredential, "userId">
) => {
  const userExists = await getUserByEmail(email);

  if (!userExists) throw new Error("Invalid User");

  await createCredential({ ...credential, userId: userExists.id });
};
