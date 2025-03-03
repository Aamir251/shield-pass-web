"use client";

import SignUpButton from "./signup-button"
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/forms/auth-form";
import { signUpAction } from "../../_actions/signup-action";
import { BASE_URL, } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { signUpMiddleware } from "../../_utils/signup-middleware";

const SignUpForm = () => {
  
  const router = useRouter()
  const searchParams = useSearchParams()

  const { toast } = useToast()

  const formAction = async (formData: FormData) => {
    try {

      const { email, formData : finalFormData, password ,schoolName } = await signUpMiddleware(formData)

      const resp = await signUpAction({ error: "" }, finalFormData)

      if (resp?.error) throw Error(resp.error)

      // // Loggin In at the same time
      const signInResp = await signIn("credentials", { email, password, redirect: false })

      if (!signInResp?.ok) throw new Error(`${signInResp?.error}`)

      const callbackUrl = searchParams.get("callbackUrl")

      router.push(callbackUrl ?? BASE_URL)


    } catch (error: any) {

      console.log({ error });

      toast({
        title: error.message
      })

    }
  }

  return (
    <form action={formAction} className="space-y-10">
      <div className="space-y-5">
        <Form isSignUpForm={true} />
      </div>
      <SignUpButton />
    </form>

  )
}

export default SignUpForm