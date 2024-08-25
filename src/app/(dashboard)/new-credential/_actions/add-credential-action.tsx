"use server"

import { extractFormData } from "@/lib/helpers/form"
import { CreateCredential } from "@/types/credentials"
import { createCredentialUseCase } from "@/use-cases/credential"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export const addCredentialAction = async (formData: FormData) => {

  const formFields = ["name", "username", "type", "email", "category", "password", "websiteUrl"] as const

  const data = extractFormData(formData, formFields)

  const tags = formData.getAll("tags") as string[]


  try {
    const session = await getServerSession()
    if (!session?.user?.email) throw new Error("Session Expired")

    const credentialObj: Omit<CreateCredential, "userId" | "sharedWith"> = {
      ...data,
      tags
    }

    await createCredentialUseCase(session.user.email, credentialObj)


    revalidatePath('/dashboard')
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
