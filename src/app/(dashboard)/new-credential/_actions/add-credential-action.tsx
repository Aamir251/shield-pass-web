"use server"

import { extractFormData } from "@/lib/helpers/form"
import { checkIfSessionExists } from "@/lib/services/auth"
import { CreateCredential } from "@/types/credentials"
import { createCredentialUseCase } from "@/use-cases/credential"

export const addCredentialAction = async (formData: FormData) => {

  const createCredentialDto = (credential :  Omit<CreateCredential, "userId" | "sharedWith">) => {
    const { category, email, name, password, username, websiteUrl } = credential;

    return {
      category, email, name, password, username, websiteUrl
    }
  }

  const formFields = ["name", "username", "email", "category", "passwordIV", "passwordData", "websiteUrl"] as const

  const data = extractFormData(formData, formFields)


  // const tagsArray = formData.getAll("tags") as string[]

  // const tagsString = tagsArray?.length ? tagsArray.join("≅") : ""

  try {
    const { email } = await checkIfSessionExists()

    const credentialObj: Omit<CreateCredential, "userId" | "sharedWith"> = {
      ...data,
      password : {
        iv : data.passwordIV,
        data : data.passwordData
      }
    }


    const credentialToCreate = createCredentialDto(credentialObj)

    await createCredentialUseCase(email!, credentialToCreate)

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
