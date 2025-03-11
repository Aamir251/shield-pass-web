import SignUpForm from "./_components/signup-form";
import { Suspense } from "react";
import { Metadata } from "next";


const SignUpPage = () => {
  return (
    <div className="relative z-10 flex flex-col justify-center h-full  md:max-w-sm py-5">

      <div className="text-center">
        <h1 className="text-4xl text-primary-white">Welcome !</h1>
        <p className="mt-2 text-secondary-white mb-5">Create an Account and Start using ShieldPass</p>
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        <SignUpForm />
      </Suspense>
    </div>
  )
}

export default SignUpPage;




export const metadata: Metadata = {
  title: "Sign Up | Create Account"
}
