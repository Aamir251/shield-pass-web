"use server";

import { extractFormData } from "@/lib/helpers/form";
import { createUserUseCase } from "@/use-cases/user";

export const signUpAction = async (prevState: any, formData: FormData) => {
  try {
    const formFields = ["username", "email", "password", "publicKey"] as const;

    const { username, email, password, publicKey } = extractFormData(formData, formFields);

   
    

    await createUserUseCase({ name : username, email, password, publicKey });
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
