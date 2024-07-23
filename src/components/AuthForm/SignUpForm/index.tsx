"use client";

import { signUpAction } from "@/lib/actions/auth"
import Form from "../Form"
import SignUpButton from "./SignUpButton"
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { extractFormData, validateFormFields } from "@/lib/helpers/form";

const SignUpForm = () => {
  const router = useRouter()
  const [error, setError] = useState<string>("")

  const formAction = async (formData: FormData) => {
    try {

      const formFields = ["username", "email", "password", "confirmPassword"] as const

      validateFormFields(formData, formFields);

      const { email, password } = extractFormData(formData, formFields)


      const resp = await signUpAction({ error: "" }, formData)

      console.log({ resp })
      if (resp?.error) throw Error(resp.error)

      const signInResp = await signIn("credentials", { email, password, redirect: false })

      if (signInResp?.ok) {
        router.push("/")
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