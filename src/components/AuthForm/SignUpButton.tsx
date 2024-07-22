"use client";

import { useFormStatus } from "react-dom";

const SignUpButton = () => {

  const { pending } = useFormStatus()

  return (
    <button>
      { pending ? "Please Wait" : "LogIn"}
    </button>
  )
}

export default SignUpButton