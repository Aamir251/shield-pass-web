"use server";

import { extractFormData } from "@/lib/helpers/form";
import { createUserUseCase } from "@/use-cases/user";

export const signUpAction = async (prevState: any, formData: FormData) => {
  try {
    const formFields = ["username", "email", "password", "sharedPublicKey", "sharedPrivateKey"] as const;

    let { username, email, password, sharedPublicKey, sharedPrivateKey : privateKey  } = extractFormData(formData, formFields);
    

    const sharedPrivateKey = JSON.parse(privateKey) as {
      iv : string
      salt : string
      data : string
    };



    await createUserUseCase({ name : username, email, password, sharedPublicKey, sharedPrivateKey });
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
