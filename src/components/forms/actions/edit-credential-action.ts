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

    const fieldsToUpdate: Omit<UpdateCredential, "userId" | "sharedWith"> = {
      ...data,

    }

    if (Object.keys(data).includes("password")) {

      const encryptedPassword = JSON.parse(data.password)
      fieldsToUpdate["password"] = {
        iv: encryptedPassword.iv,
        data: encryptedPassword.data
      }
    }

    
    await updateCredentialUseCase(email!, fieldsToUpdate, formData.get("credentialId") as string)

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