"use client"

import Link from "next/link"
import { useFormStatus } from "react-dom"

const LoginButton = () => {

  const { pending } = useFormStatus()
  return (
    <div>
      <button aria-disabled={pending} disabled={pending} type="submit"
        className="btn-primary px-6 py-2.5 rounded-md w-full font-medium"
      >
        {pending ? "Please Wait" : "LOGIN"}
      </button>

      <div className="mt-4 text-sm flex justify-between gap-x-3">
        <Link href={"/forgot-password"} className="text-primary-gray hover:text-white text-sm">Forgot Password</Link>

        <p className="text-light  text-right">
          <span>No Account? </span>
          <Link className="hover:text-purple-700" href={"/signup"}>
            Create One
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginButton