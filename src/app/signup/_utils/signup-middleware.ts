import { convertCryptoKeyToString, encryptMainEncrytionKey, encryptSharedPrivateKey, generateKeyPair, generateMainEncryptionKey, storeEncryptionKeyLocally } from "@/lib/helpers/cipher";
import { extractFormData, validateFormFields } from "@/lib/helpers/form";

export const signUpMiddleware = async (formData: FormData) => {
  const formFields = ["username", "email", "password", "confirmPassword", "schoolName"] as const

  validateFormFields(formData, formFields);


  // email & password used to login & encryption Key generation on successful sign up
  const { email, password, schoolName, confirmPassword } = extractFormData(formData, formFields)

  if (password !== confirmPassword) throw new Error("Passwords don't match")

  // store this public as a field in User Details  
  const { publicKey, privateKey } = await generateKeyPair()
  // the publicKey key is CryptoKey format which needs to converted into string format for storing it in database

  const publicKeyInStringFormat: string = await convertCryptoKeyToString(publicKey)

  const sharedPrivateKey = await encryptSharedPrivateKey(privateKey, password)

  // the public key is stored in database
  formData.set("sharedPublicKey", publicKeyInStringFormat)

  formData.set("sharedPrivateKey", JSON.stringify(sharedPrivateKey))

  /**
   * Create an encryption key for encrypting my credentials and save it
   * This is only created once when the user Signs Up
  */
  const encryptionKey = await generateMainEncryptionKey()

  const encryptionKeyMain = await encryptMainEncrytionKey(encryptionKey, password)

  // encrypt the main key using the recovery answer (School Name) as well
  const encryptionKeyRecovery = await encryptMainEncrytionKey(encryptionKey, schoolName)

  formData.set("mainEncryption", JSON.stringify(encryptionKeyMain))
  formData.set("recoveryEncryption", JSON.stringify(encryptionKeyRecovery))

  await storeEncryptionKeyLocally(encryptionKey)

  
  return {
    formData,
    email,
    password
  }
}