"use server";

import { checkIfSessionExists } from "@/lib/services/auth";
import { shareCredentialUseCase } from "@/use-cases/credential/credential.share";


export const shareCredentialAction = async (credentialId: string, formData: FormData) => {

  try {

    const { email } = await checkIfSessionExists()
    const targetEmail = formData.get("email") as string

    if (!targetEmail) throw new Error("Please Enter Email")

    await shareCredentialUseCase(email!, targetEmail, credentialId)

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

