"use server";

import { extractFormData } from "@/lib/helpers/form";
import { extractProperties, getFieldsThatHaveChanged, haveSameStringElements } from "@/lib/helpers/utils";
import { updateCredentialUseCase } from "@/use-cases/credential";
import { Credential } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const updateCredentialAction = async (formData: FormData, credential : Credential) => {
  const formFields = ["name", "type", "username", "email", "password", "category", "websiteUrl"] as const

    const newData = extractFormData(formData, formFields)

    const changedFields = getFieldsThatHaveChanged(credential, newData)

    const propertiesToUpdate = extractProperties(newData, changedFields)

    const newTags = formData.getAll("tags") as string[]

    const areTagsSame = haveSameStringElements(newTags, credential.tags)

    let dataToUpdate : Partial<Credential> = {
      ...propertiesToUpdate
    };


    if (!areTagsSame) {
      dataToUpdate.tags = newTags
    }




  try {
    const session = await getServerSession();

    if (!session?.user?.email)
      throw new Error("Session Expired");


    const resp = await updateCredentialUseCase(
      session.user.email,
      dataToUpdate,
      credential.id
    );

    console.log({ resp });
    revalidatePath(`/dashboard/${credential.type}/credentials/${credential.category}/${credential.id}`)
    return {
      success: true,
    };
  } catch (error: any) {
    console.log({ error });
    return {
      success: false,
      message: error.message || "Could Not Update Credential",
    };
  }
};
