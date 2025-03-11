import LoginForm from "./_components/login-form";
import { Suspense } from "react";
import { Metadata } from "next";


const LoginPage = () => {
  return (
    <div className="relative z-10 flex flex-col justify-center h-full space-y-10 md:max-w-sm">
      <div className="text-center">
        <h1 className="text-4xl text-primary-white">Welcome Back</h1>
        <p className="mt-2 text-secondary-white">Please enter your email and password to Login</p>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}

export default LoginPage;

export const metadata: Metadata = {
  title: "Login"
}
