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
    data[field as T[number]] = formData.get(field as string) as string;
  });

  return data;
};
