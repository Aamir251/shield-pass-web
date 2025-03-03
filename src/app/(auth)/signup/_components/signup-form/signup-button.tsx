"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";

const SignUpButton = () => {

  const { pending } = useFormStatus()

  return (
    <div>
      <button aria-disabled={pending} disabled={pending} type="submit"
        className="btn-primary px-6 py-2.5 rounded-sm w-full font-medium"
      >
        {pending ? "Creating Account" : "SIGN UP"}
      </button>
      <p className="text-light text-sm mt-4 text-right">
        <span>Have an Account? </span>
        <Link className="hover:text-purple-700" href={"/login"}>
          Log In
        </Link>
      </p>
    </div>
  )
}

export default SignUpButton