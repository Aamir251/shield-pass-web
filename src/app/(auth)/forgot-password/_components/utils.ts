import { decryptMainKey, encryptMainEncrytionKey } from "@/lib/helpers/cipher"
import { EncryptedKey } from "@prisma/client"
import { RefObject } from "react"

export type StepFormProps = {
  moveNext? : () => void
  formRef : RefObject<HTMLFormElement>
}



export const getNewEncryptedKey = async (encryptionKey : EncryptedKey, schoolName : string, newPassword : string) => {

  // decrypt the encryption key stored in database using the schoolName
  const decryptedKey : CryptoKey = await decryptMainKey(encryptionKey, schoolName)
  // encrypt it using the newPassword
  const newEncryptedKey = await encryptMainEncrytionKey(decryptedKey, newPassword)

  return newEncryptedKey
}
