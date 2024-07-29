"use client";

import SignUpButton from "./signup-button"
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { extractFormData, validateFormFields } from "@/lib/helpers/form";
import { HOME_LINK } from "@/constants/homelink";
import Form from "@/components/auth-form/Form";
import { signUpAction } from "../../_actions/signup-action";

const SignUpForm = () => {
  const router = useRouter()
  const [error, setError] = useState<string>("")
  const searchParams = useSearchParams()

  const formAction = async (formData: FormData) => {
    try {

      const formFields = ["username", "email", "password", "confirmPassword"] as const

      validateFormFields(formData, formFields);

      const { email, password } = extractFormData(formData, formFields)


      const resp = await signUpAction({ error: "" }, formData)

      if (resp?.error) throw Error(resp.error)

      const signInResp = await signIn("credentials", { email, password, redirect: false })

      if (signInResp?.ok) {
        const callbackUrl = searchParams.get("callbackUrl")

        router.push(callbackUrl ?? HOME_LINK)
      }

    } catch (error: any) {
      setError(error.message)

    }
  }

  return (
    <form action={formAction} className="space-y-9">
      <div className="h-6">{error}</div>
      <Form isSignUpForm={true} />
      <SignUpButton />
    </form>

  )
}

export default SignUpForm