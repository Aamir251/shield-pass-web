"use client";

import SignUpButton from "./signup-button"
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { extractFormData, validateFormFields } from "@/lib/helpers/form";
import Form from "@/components/forms/auth-form";
import { signUpAction } from "../../_actions/signup-action";
import { BASE_URL, LOCALSTORAGE_KEYS } from "@/constants";
import { convertPublickKeytoBase64, generateKeyPair, generatePrivateEncryptionKey, storeKeyLocally } from "@/lib/helpers/cipher";
import { saveDataToLocalStorage } from "@/lib/helpers/utils";
import { useToast } from "@/hooks/use-toast";

const SignUpForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { toast } = useToast()

  const formAction = async (formData: FormData) => {
    try {

      const formFields = ["username", "email", "password", "confirmPassword"] as const

      validateFormFields(formData, formFields);

      // email & password used to login & encryption Key generation on successful sign up
      const { email, password } = extractFormData(formData, formFields)


      // store this public as a field in User Details  
      const { publicKey, privateKey } = await generateKeyPair()
      // the publicKey key is BufferArray format which needs to converted into string format for storing it in database
      const publicKeyInStringFormat: string = convertPublickKeytoBase64(publicKey)
      const privateKeyInStringFormat: string = convertPublickKeytoBase64(privateKey)

      // save the private key in local storage
      saveDataToLocalStorage(LOCALSTORAGE_KEYS.PRIVATE_KEY, privateKeyInStringFormat)

      // the public key is stored in database
      formData.set("publicKey", publicKeyInStringFormat)

      const resp = await signUpAction({ error: "" }, formData)

      if (resp?.error) throw Error(resp.error)


      // Create a private encryption key for encrypting my credentials and save it

      const encryptionKey = await generatePrivateEncryptionKey(email, password)

      await storeKeyLocally(encryptionKey)




      // Loggin In at the same time
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
    <form action={formAction} className="space-y-6">
      <Form isSignUpForm={true} />
      <SignUpButton />
    </form>

  )
}

export default SignUpForm