"use server";

import { checkIfSessionExists } from "@/lib/services/auth";
import { shareCredentialUseCase } from "@/use-cases/credential/credential.share";


export const shareCredentialAction = async (credentialId: string, formData: FormData) => {

  try {

    const { email } = await checkIfSessionExists() // ID of the owner

    const recipientEmail = formData.get("email") as string

    const encryptedPassword = formData.get("password") as string

    if (!encryptedPassword) throw new Error("Password Not Found")
    
    await shareCredentialUseCase(email!, recipientEmail, credentialId, encryptedPassword)

    return {
      success: true
    }
  } catch (error: any) {

    console.log({ error })

    return {
      success: false,
      message: error.message
    }
  }
}

