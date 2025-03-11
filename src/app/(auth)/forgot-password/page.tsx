import LabelInputWrapper from "@/components/forms/label-input-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Form from "./_components/form"

const ForgotPasswordPage = () => {
  return (
    <div className="relative z-10 flex flex-col justify-center h-full  md:max-w-sm py-5">

      <div className="text-center">
        <h1 className="text-4xl text-primary-white">Reset Password</h1>
        <p className="mt-2 text-secondary-white text-sm">Please provide the following details to reset your password</p>
      </div>

      <Form />
    </div>
  )
}

export default ForgotPasswordPage