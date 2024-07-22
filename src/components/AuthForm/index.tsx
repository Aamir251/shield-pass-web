"use client"

import Form from "./Form"
import { login, signUp } from "@/lib/actions/auth"
import LoginButton from "./LoginButton"
import SignUpButton from "./SignUpButton"
import { useFormState } from "react-dom"
import { useEffect, useRef, useState } from "react"


type AuthFormProps = {
  type : "LOGIN" | "SIGNUP"
}


const AuthForm = ({ type } : AuthFormProps) => {
  
  const formAction = type === 'LOGIN' ? login : signUp
  let formRef = useRef<HTMLFormElement>()
  // const submitHandler = type === 'LOGIN' ? login : signUp

  // const [ error, setError ] = useState(false)

  // const formAction = async (formData : FormData) => {
  //   const res = await submitHandler(formData)

  //   if (res?.error) {

  //   }
    
  // }

  const [ state, action ] = useFormState(formAction, null)

  useEffect(() => {

    if (state?.error) {
      
      
    }
  },[state?.error])

  console.log({ state });
  
  return (
    <form ref={formRef} action={action} className="space-y-9 text-light">
      
   
      <Form />
      { 
        type === 'LOGIN' ? <LoginButton /> : <SignUpButton /> 
      }



    </form>
  )
}


export const LoginForm = () => <AuthForm type="LOGIN" />
export const SignUpForm = () => <AuthForm type="SIGNUP" />