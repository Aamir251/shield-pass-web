"use client"

import Link from "next/link"
import { useFormStatus } from "react-dom"

const LoginButton = () => {

  const { pending } = useFormStatus()
  return (
    <div>
      <button aria-disabled={pending} disabled={pending} type="submit"
        className="btn-primary px-6 py-2.5 rounded-sm w-full"
      >
        {pending ? "Please Wait" : "LOGIN"}
      </button>

      <p className="text-light text-sm mt-4 text-right">
        <span>No Account? </span>
        <Link className="hover:text-purple-700" href={"/signup"}>
          Create One
        </Link>
      </p>
    </div>
  )
}

export default LoginButton