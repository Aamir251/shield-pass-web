"use client"

import LoginButton from "./login-button";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { extractFormData, handleAuthError, validateFormFields } from "@/lib/helpers/form";
import Form from "@/components/auth-form/Form";
import { BASE_URL } from "@/constants";
import { showToastErrorMessage } from "@/lib/helpers/toast";

const LoginForm = () => {

  const router = useRouter()
  const searchParams = useSearchParams()



  const formAction = async (formData: FormData) => {

    try {
      const formFields = ["email", "password"] as const

      validateFormFields(formData, formFields);

      const { email, password } = extractFormData(formData, formFields)

      const resp = await signIn("credentials", { email, password, redirect: false })

      if (resp?.error) throw new Error("Invalid Credentials")

      // resp?.error && handleAuthError(resp.error)

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