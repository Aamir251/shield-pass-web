"use server"

import { extractFormData } from "@/lib/helpers/form"
import { CreateCredential } from "@/types/credentials"
import { createCredentialUseCase } from "@/use-cases/credential"
import { getServerSession } from "next-auth"

export const addCredentialAction = async (formData: FormData) => {

  const formFields = ["name", "username", "type", "email", "category", "password", "websiteUrl"] as const

  const data = extractFormData(formData, formFields)

  const tags = formData.getAll("tags") as string[]

  const session = await getServerSession()

  try {
    if (!session?.user?.email) throw new Error("Session Expired")

    const credentialObj: Omit<CreateCredential, "userId"> = {
      ...data,
      tags
    }

    await createCredentialUseCase(session.user.email, credentialObj)

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
