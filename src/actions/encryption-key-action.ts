"use server";


import { getMainEncryptionKey } from "@/data/user";
/**
 * Checks if the password is valid or not
 */
import { authenticateUser, checkIfSessionExists } from "@/lib/services/auth";



type masterPasswordFormActionProps = {
  password : string
}

export const encryptionKeyAction = async ({ password } : masterPasswordFormActionProps) => {
  
  const { email } = await checkIfSessionExists()

  // verify password
  const user = await authenticateUser(email!, password)
  if (!user) throw new Error("Invalid Password! ")
  

  // get the mainEncryptionKey object from database

  const data = await getMainEncryptionKey(email!)
  if (!data) throw new Error ("Something went wrong")

  

  return {
    encryptionKeyMain : data.encryptionKeyMain
  }


  // if password valid return true
}