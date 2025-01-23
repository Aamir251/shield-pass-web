"use server"

import { extractFormData } from "@/lib/helpers/form"
import { checkIfSessionExists } from "@/lib/services/auth"
import { UpdateCredential } from "@/types/credentials"
import { updateCredentialUseCase } from "@/use-cases/credential"
import { revalidatePath } from "next/cache"

export const editCredentialAction = async (formData: FormData, targetFields: string[]) => {



  const formFields = [...targetFields] as const


  const data = extractFormData(formData, formFields)

  try {
    const { email } = await checkIfSessionExists()

    const credentialObj: Omit<UpdateCredential, "userId" | "sharedWith"> = {
      ...data,

    }

    if (Object.keys(data).includes("passwordIV")) {
      credentialObj["password"] = {
        iv: data.passwordIV,
        data: data.passwordData
      }
    }

    await updateCredentialUseCase(email!, data, formData.get("credentialId") as string)


    revalidatePath("/recents")
    revalidatePath(`/${formData.get("category")}`)

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