"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addCredentialAction } from "../_actions/add-credential-action"
import { useRef } from "react"
import { useRouter } from "next/navigation";
import { showSessionExpiredToastMessage, showSuccessToastMessage } from "@/lib/helpers/toast";
import { CREDENTIAL_CATEGORIES, ERRORS } from "@/constants";
import { PropsWithChildren } from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import LabelInputWrapper from "@/components/forms/label-input-wrapper";
import { useEncryptionKeyContext } from "@/providers/encryption-key";
import { encryptPassword } from "@/lib/helpers/cipher";
import { useToast } from "@/hooks/use-toast";


const CreateCredentialForm = () => {

  const { toast } = useToast()

  const { encryptionKey } = useEncryptionKeyContext()

  let formRef = useRef<HTMLFormElement>(null)

  const router = useRouter()

  let timeoutId: NodeJS.Timeout
  
  const formAction = async (formData: FormData) => {

    const password = formData.get("password") as string
    // Encrypt Password
    const passwordObject = await encryptPassword(password, encryptionKey!)


    formData.set("iv", passwordObject.iv)
    formData.set("password", passwordObject.encryptedPassword)
    
    const resp = await addCredentialAction(formData)

    if (!resp.success) {
      // Failure
      if (resp.message === ERRORS.SESSION_EXPIRED) {

        showSessionExpiredToastMessage()

        timeoutId && clearTimeout(timeoutId)

        timeoutId = setTimeout(() => {
          const currentUrl = window.location.href
          router.push(`/login?callbackUrl=${currentUrl}`)
        })
      }

      // show a toast
    } else {

      toast({
        title : "Credential Created 🎉"
      })
      formRef?.current?.reset()
    }
  }

  return (

    <form ref={formRef} action={formAction} className="mt-8 space-y-6">
      <TwoCols>
        <LabelInputWrapper labelTitle="Credential Name">
          <Input required placeholder="Credential name" name="name" />
        </LabelInputWrapper>

        <LabelInputWrapper labelTitle="Username">
          <Input placeholder="Username" name="username" />
        </LabelInputWrapper>
      </TwoCols>

      <TwoCols>
        <LabelInputWrapper labelTitle="Email">
          <Input placeholder="email" name="email" />
        </LabelInputWrapper>

        <LabelInputWrapper labelTitle="Password">
          <Input placeholder="*******" name="password" />
        </LabelInputWrapper>
      </TwoCols>


      <TwoCols>
        <LabelInputWrapper labelTitle="Website URL">
          <Input placeholder="https://gmail.com" name="websiteUrl" />
        </LabelInputWrapper>

        <LabelInputWrapper labelTitle="Category">
          <Select defaultValue="applications" name="category">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="applications" />
            </SelectTrigger>
            <SelectContent>
              {
                CREDENTIAL_CATEGORIES.map(category => (
                  <SelectItem key={category} value={`${category}`}>{category}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </LabelInputWrapper>
      </TwoCols>

      <div className="flex justify-center">
        <Button type="submit">
          Create Credential
        </Button>
      </div>
    </form>
  )
}

export default CreateCredentialForm;


const TwoCols = ({ children }: PropsWithChildren) => {


  return <div className="grid grid-cols-2 gap-x-6">
    {children}
  </div>
}
