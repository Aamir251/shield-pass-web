"use client"

import { useEffect, useState } from "react";
import Form from "../Form"
import LoginButton from "./LoginButton";
import { signIn } from "next-auth/react";

const LoginForm = () => {

  const [error, setError] = useState<string>("")

  const formAction = async (formData: FormData) => {
    try {
      const email = formData.get("email");

      const password = formData.get("password");

      if (!email) throw new Error("Please Enter Email");
      if (!password) throw new Error("Please Enter Password");

      const resp = await signIn("credentials", { email, password, redirect: false })

      if (resp?.error && resp.error === "CredentialsSignin") {
        throw new Error("User Not found")
      }

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