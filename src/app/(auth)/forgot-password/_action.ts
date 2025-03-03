"use server";

import { changePasswordUseCase, verifySchoolNameUseCase } from "@/use-cases/user";


export const schoolNameAction = async (formData: FormData) => {

  const email = formData.get("email") as string
  const schoolName = formData.get("school-name") as string

  if (!email || !schoolName) {
    return {
      success : false,
      message : "Please Enter All fields!"
    }
  }


  // verify
  const { isValid, message } = await verifySchoolNameUseCase(email, schoolName)

  if (!isValid) {
    return {
      success : false,
      message : message
    }
  }

  return {
    success : true,
  }
}

export const changePasswordAction = async (formData : FormData) => {
  
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const confirmPassword = formData.get("confirm-password") as string

  if (password !== confirmPassword) {
    return {
      success : false,
      message : "Passwords don't match"
    }
  }

  const { success, message } = await changePasswordUseCase(email, password);


  return {
    success,
    message
  }

}