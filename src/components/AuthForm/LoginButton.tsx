"use client"

import { useFormStatus } from "react-dom"

const LoginButton = () => {

  const { pending } = useFormStatus()
  return (
    <button type="submit" className="btn-primary px-6 py-2.5 rounded-sm">
      { pending ? "Please Wait" : "LogIn"}
    </button>
  )
}

export default LoginButton