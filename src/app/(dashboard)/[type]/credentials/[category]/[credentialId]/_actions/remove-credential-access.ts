import { checkIfSessionExists } from "@/lib/services/auth"
import { removeCredentialAccessUseCase } from "@/use-cases/credential/credential.share"

export const removeCredentialAccessAction = async (credentialId: string, formData: FormData) => {

  try {
    const { email } = await checkIfSessionExists()
    const receipientId = formData.get("recipientId") as string

    if (!receipientId) throw new Error("Recipient ID Not Found")

    await removeCredentialAccessUseCase(email!, credentialId, receipientId)

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