"use client"

import LoginButton from "./login-button";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { extractFormData, handleAuthError, validateFormFields } from "@/lib/helpers/form";
import Form from "@/components/forms/auth-form";
import { showToastErrorMessage } from "@/lib/helpers/toast";
import { generatePublicEncryptionKey, storeKeyLocally } from "@/lib/helpers/cipher";
import { BASE_URL } from "@/constants";




const LoginForm = () => {

  const router = useRouter()
  const searchParams = useSearchParams()


  const formAction = async (formData: FormData) => {

    try {
      const formFields = ["email", "password"] as const

      validateFormFields(formData, formFields);

      const { email, password } = extractFormData(formData, formFields)
      
      const resp = await signIn("credentials", { email, password, redirect : false })
      resp?.error && handleAuthError(resp.error)
      
      
      const key = await generatePublicEncryptionKey(email, password)

      await storeKeyLocally(key) // stores it to local storage

      const callbackUrl = searchParams.get("callbackUrl")

      router.push(callbackUrl ?? BASE_URL)

    } catch (error: any) {

      showToastErrorMessage(error.message)
    }
  }


  return (
    <form action={formAction} className="space-y-12">

      <Form />
      <LoginButton />
    </form>
  )
}

export default LoginForm