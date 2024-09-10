"use server"

import { checkIfSessionExists } from "@/lib/services/auth"
import { removeCredentialAccessUseCase } from "@/use-cases/credential/credential.share"

export const removeCredentialAccessAction = async (credentialId: string, formData: FormData) => {

  try {
    const { email } = await checkIfSessionExists()
    const receipientId = formData.get("recipientId") as string

    if (!receipientId) throw new Error("Recipient ID Not Found")

    console.log({ email, receipientId });


    await removeCredentialAccessUseCase(receipientId, email!, credentialId)

    return {
      success: true
    }

  } catch (error: any) {

    console.log({ error });

    return {
      success: false,
      message: error.message
    }

  }
}