"use server";

import { extractFormData } from "@/lib/helpers/form";
import { createUserUseCase } from "@/use-cases/user";

type EncryptionKey = {
  iv : string
  salt : string
  data : string
}

export const signUpAction = async (prevState: any, formData: FormData) => {

  try {
    const formFields = ["username", "email", "password", "sharedPublicKey", "sharedPrivateKey", "mainEncryption", "recoveryEncryption", "schoolName"] as const;

    let { username, email, password, sharedPublicKey, sharedPrivateKey : privateKey, mainEncryption, recoveryEncryption, schoolName  } = extractFormData(formData, formFields);
    
    const sharedPrivateKey = JSON.parse(privateKey) as EncryptionKey;

    const encryptionKeyMain = JSON.parse(mainEncryption) as EncryptionKey
    const encryptionKeyRecovery = JSON.parse(recoveryEncryption) as EncryptionKey

    const userToCreate = {
      name : username, 
      email, 
      password,
      sharedPublicKey, 
      sharedPrivateKey, 
      schoolName,
      encryptionKeyMain,
      encryptionKeyRecovery
    }

    

    await createUserUseCase(userToCreate)


  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
