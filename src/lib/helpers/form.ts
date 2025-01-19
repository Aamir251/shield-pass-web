export const validateFormFields = (
  formData: FormData,
  fieldsToVerify: readonly string[]
) => {
  fieldsToVerify.forEach((field) => {
    const val = formData.get(field);

    if (!val || !val.toString().length) {
      throw new Error(`Please Enter ${field}`);
    }
  });
};

type ExtractFormData<T extends readonly string[]> = {
  [Key in T[number]]: string;
};

export const extractFormData = <T extends readonly string[]>(
  formData: FormData,
  fields: T
): ExtractFormData<T> => {
  let data = {} as ExtractFormData<T>;

  fields.forEach((field) => {
    const fieldData = formData.get(field) || "";
    data[field as T[number]] = fieldData as string;
  });

  return data;
};

enum KnownErrorMessages {
  InvalidPassword = "Invalid Password",
  CredentialsSignin = "CredentialsSignin",
}

export const handleAuthError = (errorMessage: KnownErrorMessages | string) => {
  if (errorMessage === KnownErrorMessages.CredentialsSignin)
    throw new Error("Incorrect Email or Password");
  if (errorMessage === KnownErrorMessages.InvalidPassword)
    throw new Error("Incorrect Password");
};
