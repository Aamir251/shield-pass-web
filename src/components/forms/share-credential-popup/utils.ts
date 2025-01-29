/**
 * This acts like a middleware
 * It decrypts the original hashed password of the credential to extract the plain password
 * Then encrypts it using the public key of the recipient
 * and returns this new encrypted password created explicitly for the recipient
 */

import { convertStringToCryptoKey, decryptCredentialPassword, encryptSharedCredentialPassword } from "@/lib/helpers/cipher"
import { CredentialBasic } from "@/types/credentials"


type CredentialPasswordEncryption = Pick<CredentialBasic, "password"> & {
  secretKey: CryptoKey // Owner's secret key that is used to encrypt and decrypt his credential's password
}

type ShareCredentialMiddlewareProps = {
  passwordEncryption: CredentialPasswordEncryption,
  recipientEmail: string
}


export const shareCredentialMiddleware = async ({
  passwordEncryption,
  recipientEmail
}: ShareCredentialMiddlewareProps) => {

  try {


    const { password, secretKey } = passwordEncryption

    const plainPassword = await decryptCredentialPassword(password.data, password.iv, secretKey)
    
    /**
     * decrypt the actual password and encrypt it using recipient's public key
    */
   
    const { recipientPublicKey, error } = await fetchRecipientPublicKey(recipientEmail)

    if (error || !recipientPublicKey) throw new Error(error)


    console.log({ recipientPublicKey })
    /**
     * Encrypt the password using recipient public key which can be shared with the Recipient
    */
    const finalPassword = await encryptSharedCredentialPassword(plainPassword, recipientPublicKey)

    return {
      finalPassword
    }
  } catch (error : any ) {


    console.log("ERROR ", error)

    return {
      error : error.message
    }
  }

}



async function fetchRecipientPublicKey(recipientEmail: string) {
  try {

    const resp = await fetch(`/api/get-recipient-public-key?email=${recipientEmail}`, {
      method: "GET",

    })

    const data = await resp.json()
    if (!data.success) throw new Error(data.message)

    console.log({ data })
    
    const key = data.recipientPublicKey as string // this is in string format

    // convert key (string) to CryptoKey format

    console.log({ key })

    const recipientPublicKey = await convertStringToCryptoKey(key)

    return {
      recipientPublicKey
    }

  } catch (error: any) {
    return {
      error: error.message
    }
  }
}