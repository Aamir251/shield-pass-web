"use client"

import LoginButton from "./login-button";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { extractFormData, handleAuthError, validateFormFields } from "@/lib/helpers/form";
import Form from "@/components/forms/auth-form";
import { BASE_URL } from "@/constants";
import { generateEncryptionKey, getEncryptionKeyFromLocalStorage, storeEncryptionKeyLocally } from "@/lib/helpers/cipher";
import { useToast } from "@/hooks/use-toast";




const LoginForm = () => {

  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const formAction = async (formData: FormData) => {

    try {
      const formFields = ["email", "password"] as const

      validateFormFields(formData, formFields);

      const { email, password } = extractFormData(formData, formFields)
      
      const resp = await signIn("credentials", { email, password, redirect : false })

      console.log({ resp })
      resp?.error && handleAuthError(resp.error)




      let encryptionKey =  await getEncryptionKeyFromLocalStorage()

      if (!encryptionKey) {
        encryptionKey = await generateEncryptionKey(email, password)
      }
      

      await storeEncryptionKeyLocally(encryptionKey) // stores it to local storage

      const callbackUrl = searchParams.get("callbackUrl")

      router.push(callbackUrl ?? BASE_URL)

    } catch (error: any) {
      console.log({ LOGIN_ERROR : error })
      toast({
        title : error.message
      })
    }
  }


  return (
    <form action={formAction} className="space-y-5">

      <Form />
      <LoginButton />
    </form>
  )
}

export default LoginForm