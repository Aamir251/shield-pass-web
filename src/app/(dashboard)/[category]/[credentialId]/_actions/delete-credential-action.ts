"use server";

import { extractFormData, validateFormFields } from "@/lib/helpers/form";
import { deleteCredentialUseCase } from "@/use-cases/credential";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const deleteCredentialAction = async (
  formData: FormData,
  revalidateUrl: string
) => {
  try {
    const session = await getServerSession();

    const formFields = ["credentialId"] as const;
    validateFormFields(formData, formFields);

    const { credentialId } = extractFormData(formData, formFields);

    if (!session?.user?.email) throw Error("Session Expired");

    const resp = await deleteCredentialUseCase(
      session.user.email,
      credentialId
    );

    revalidatePath(`${revalidateUrl}`);

    return {
      success: true,
    };
  } catch (error: any) {
    console.log({ error });
    return {
      success: false,
      message: error.message || "Could Not Delete Credential",
    };
  }
};
