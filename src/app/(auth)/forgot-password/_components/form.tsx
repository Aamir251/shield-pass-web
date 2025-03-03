"use client";

import { useCallback, useRef, useState } from "react";
import EmailAndPasswordForm from "./email-and-answer-form";
import NewPassword from "./new-password";
import { changePasswordAction } from "../_action";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const Form = () => {

  const { toast } = useToast();
  const router = useRouter()
  const [ email, setEmail ] = useState<string>("")

  const steps = [
    { id: 1, component: EmailAndPasswordForm },
    { id: 2, component: NewPassword },
  ];

  let formRef = useRef<HTMLFormElement>(null)

  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = useCallback((email : string) => {
    
    setEmail(email)

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, steps.length]);


  const StepComponent = steps[currentStep].component;

  const formAction = async (formData: FormData) => {

    formData.set("email", email)

    const { success, message } = await changePasswordAction(formData)

    if (success) {
      toast({
        title : "Password Updated! 🎉"
      })
      router.push("/login")

    } else {
      toast({
        title : message
      })
    }
  }

  return (
    <form action={formAction} ref={formRef} className="mt-10">
      <StepComponent formRef={formRef} moveNext={handleNext} />
    </form>
  )
}

export default Form