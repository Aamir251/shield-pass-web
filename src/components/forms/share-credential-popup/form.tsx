"use client";

import { KeyedMutator } from "swr"
import { shareCredentialAction } from "../actions/share-credential-action"
import { LoadingSpinner } from "../../ui/loading-spinner"
import { Input } from "../../ui/input"
import LabelInputWrapper from "../label-input-wrapper"
import { Button } from "../../ui/button"
import { useToast } from "@/hooks/use-toast"
import { CredentialBasic } from "@/types/credentials"
import { useEncryptionKeyContext } from "@/providers/encryption-key"
import { shareCredentialMiddleware } from "./utils"
import CredentialRecipients from "./credential-recipients";
import { removeRecipientAction } from "../actions/remove-recipient-action";

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

        const existingRecipients = recipientsData?.recipients ?? []
        mutate({ ...recipientsData, recipients: [...existingRecipients, { email : formData.get("email")} ] })
      }

   
    } catch (error : any) {

      console.log({ error })
      toast({
        title: error.message,
      })
    }
  }

  const handleRemoveRecipient = async (recipientEmail : string) => {

    const { success, message } = await removeRecipientAction(recipientEmail, credential?.id!)

    if (success) {

      toast({
        title : "Removed Access!"
      })

      const finalRecipients = recipientsData.recipients.filter(el => el.email !== recipientEmail)
      mutate({ ...recipientsData, recipients: [...finalRecipients] })


      // handle 
    } else {
      toast({
        title : message
      })
    }
  }

  if (isLoading) {
    return (
      <div className="h-44 flex-center">
        <LoadingSpinner  />
      </div>
    )
  }



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

      {
        recipientsData ? <CredentialRecipients removeAccessCallback={handleRemoveRecipient} recipients={recipientsData.recipients} />
        : <LoadingSpinner />
      }
    </div>
  )
}

export default ShareCredentialForm