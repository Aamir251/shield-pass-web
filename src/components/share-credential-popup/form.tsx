"use client";

import { KeyedMutator } from "swr"
import { shareCredentialAction } from "./share-credential-action"
import { LoadingSpinner } from "../ui/loading-spinner"
import { Input } from "../ui/input"
import LabelInputWrapper from "../forms/label-input-wrapper"
import { Button } from "../ui/button"
import { useToast } from "@/hooks/use-toast"
import { CredentialBasic } from "@/types/credentials"
import { getRecipientPublicKey } from "@/data/user"
import { useEncryptionKeyContext } from "@/providers/encryption-key"
import { shareCredentialMiddleware } from "./utils"

type Receipent = {
  email: string
  id: string
}


type ShareCredentialFormProps = {
  credential: CredentialBasic | null
  recipientsData: {
    recipients: Receipent[]
    success: boolean
  }

  mutate: KeyedMutator<any>

}


const ShareCredentialForm = ({ credential, recipientsData, mutate }: ShareCredentialFormProps) => {
  const { toast } = useToast()

  const { encryptionKey } = useEncryptionKeyContext()

  const isLoading = !recipientsData || !credential; // if this is undefined, it means recipients have not been loaded


  const formAction = async (formData: FormData) => {
    try {
      const credentialId = credential!.id

      const recipientEmail = formData.get("email") as string


      if (!recipientEmail) throw new Error("Please Enter Email")

      if (!credential?.id) throw new Error("Credential Not Selected! ")
      
      

      const { error, finalPassword } = await shareCredentialMiddleware({
        passwordEncryption: {
          password : {
            data : credential.password.data,
            iv : credential.password.iv
          },
          secretKey : encryptionKey!
        },
        recipientEmail
      })

      if (error) throw new Error(error)

      

      formData.set("password", finalPassword!)
      formData.set("credentialId", credentialId)

      const resp = await shareCredentialAction(credentialId, formData)


      // console.log({ resp })

      if (!resp.success) {
        // failed      
        toast({
          title: resp.message,
        })
        // show toast error message
      } else {
        // success
        toast({
          title: "Credential Shared 🥳"
        })

        // const existingRecipients = recipientsData?.recipients ?? []
        // mutate({ ...recipientsData, recipients: [...existingRecipients, formData.get("email")] })
      }

   
    } catch (error : any) {

      console.log({ error })
      toast({
        title: error.message,
      })
    }
  }





  // if (isLoading) {
  //   return (
  //     <div className="h-44 flex-center">
  //       <LoadingSpinner  />
  //     </div>
  //   )
  // }



  return (
    <div>


      <form className="mt-10" action={formAction}>

        <LabelInputWrapper labelTitle="Email of Recipient">
          <Input
            type="email"
            name="email"
            placeholder="Email of Recipient"
          />
        </LabelInputWrapper>


        <Button className="mt-3">Share 🚀</Button>
      </form>

    </div>
  )
}

export default ShareCredentialForm