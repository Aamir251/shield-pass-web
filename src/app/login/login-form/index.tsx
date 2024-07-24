"use client"

import { useState } from "react";
import Form from "../../../components/auth-form/Form"
import LoginButton from "./login-button";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { extractFormData, handleAuthError, validateFormFields } from "@/lib/helpers/form";

const LoginForm = () => {

  const [error, setError] = useState<string>("")
  const router = useRouter()
  const searchParams = useSearchParams()



  const formAction = async (formData: FormData) => {

    try {
      const formFields = ["email", "password"] as const

      validateFormFields(formData, formFields);

      const { email, password } = extractFormData(formData, formFields)

      const resp = await signIn("credentials", { email, password, redirect: false })

      resp?.error && handleAuthError(resp.error)

      const callbackUrl = searchParams.get("callbackUrl")

      router.push(callbackUrl ?? "/")

    } catch (error: any) {
      setError(error.message)
    }
  }


  return (
    <form action={formAction} className="space-y-12">

      <div className="h-6">{error}</div>
      <Form />
      <LoginButton />
    </form>
  )
}

export default LoginForm