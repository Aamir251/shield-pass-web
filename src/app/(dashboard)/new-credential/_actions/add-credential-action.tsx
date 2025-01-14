"use server"

import { extractFormData } from "@/lib/helpers/form"
import { checkIfSessionExists } from "@/lib/services/auth"
import { CreateCredential } from "@/types/credentials"
import { createCredentialUseCase } from "@/use-cases/credential"

export const addCredentialAction = async (formData: FormData) => {

  const formFields = ["name", "username", "email", "category", "iv", "password", "websiteUrl"] as const

  const data = extractFormData(formData, formFields)


  // const tagsArray = formData.getAll("tags") as string[]

  // const tagsString = tagsArray?.length ? tagsArray.join("≅") : ""

  try {
    const { email } = await checkIfSessionExists()

    const credentialObj: Omit<CreateCredential, "userId" | "sharedWith"> = {
      ...data,
    }

    await createCredentialUseCase(email!, credentialObj)

    return {
      success: true
    }
  } catch (error: any) {

    return {
      success: false,
      message: error.message || "Could Not Create Credential"
    }
  }

}
