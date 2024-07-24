import { extractFormData } from "@/lib/helpers/form";
import { createUserUseCase } from "@/use-cases/users";

export const signUpAction = async (prevState: any, formData: FormData) => {
  try {
    const formFields = ["username", "email", "password"] as const;

    const { username, email, password } = extractFormData(formData, formFields);

    await createUserUseCase(username, email, password);
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
