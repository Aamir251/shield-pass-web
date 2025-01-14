/**
 * This acts like a middleware
 * It decrypts the original hashed password of the credential to extract the plain password
 * Then encrypts it using the public key of the recipient
 * and returns this new encrypted password created explicitly for the recipient
 */

import { getRecipientPublicKey } from "@/data/user"
import { convertPublickKeytoBase64, decryptPassword, encryptCredentialForSharing } from "@/lib/helpers/cipher"
import { CredentialBasic } from "@/types/credentials"


type CredentialHash = Pick<CredentialBasic, "iv" | "password"> & {
  secretKey: CryptoKey // Owner's secret key that is used to encrypt and decrypt his credential's password
}

type ShareCredentialMiddlewareProps = {
  credentialHash: CredentialHash,
  recipientEmail: string
}


export const shareCredentialMiddleware = async ({
  credentialHash,
  recipientEmail
}: ShareCredentialMiddlewareProps) => {

  try {

    const plainPassword = await decryptPassword(credentialHash.password, credentialHash.iv, credentialHash.secretKey)

    /**
     * decrypt the actual password and encrypt it using recipient's public key
    */
    const { recipientPublicKey, error } = await fetchRecipientPublicKey(recipientEmail)

    if (error) throw new Error(error)

    const finalPassword = await encryptCredentialForSharing(plainPassword, recipientPublicKey)

    // convert the passwordToShare (Array Buffer Format) into string format
    const finalPasswordInString = convertPublickKeytoBase64(finalPassword)


    return {
      finalPasswordInString
    }
  } catch (error : any ) {


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


    return {
      recipientPublicKey : data.recipientPublicKey
    }

  } catch (error: any) {
    return {
      error: error.message
    }
  }
}
