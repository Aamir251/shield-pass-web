"use server";


/**
 * Checks if the password is valid or not
 */
import { authenticateUser, checkIfSessionExists } from "@/lib/services/auth";



type masterPasswordFormActionProps = {
  password : string
}

export const masterPasswordFormAction = async ({ password } : masterPasswordFormActionProps) => {
  
  const { email } = await checkIfSessionExists()

  // verify password
  const user = await authenticateUser(email!, password)

  if (!user) {
    throw new Error("Invalid Password! ")
  }

  return {
    email : user.email
  }


  // if password valid return true
}