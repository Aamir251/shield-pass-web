"use server";

import { checkIfSessionExists } from "@/lib/services/auth";
import { removeCredentialAccessUseCase } from "@/use-cases/credential/credential.share";

export const removeRecipientAction = async (recipientEmail : string, credentialId : string) => {

  try {
    const { email } = await checkIfSessionExists()
  
    
    await removeCredentialAccessUseCase(recipientEmail, email!, credentialId)

    return {
      success : true
    }
  } catch (error : any) {
    
    return {
      success : false,
      message : error.message
    }

  }
}