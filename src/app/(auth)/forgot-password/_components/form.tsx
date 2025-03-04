"use client";

import { useCallback, useRef, useState } from "react";
import EmailAndPasswordForm from "./email-and-answer-form";
import { changePasswordAction, updateEncryptionKeyAction } from "../_action";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import NewPassword from "./new-password";
import { getNewEncryptedKey } from "./utils";
import { updateUser } from "@/data/user";
import { clearLocalStorage } from "@/lib/helpers/utils";

const Form = () => {

  const { toast } = useToast();
  const router = useRouter()

  let formRef = useRef<HTMLFormElement>(null)

  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = useCallback(() => {

    setCurrentStep(currentStep + 1);

  }, [currentStep]);



  const formAction = async (formData: FormData) => {

    const { success, message, encryptedRecoveryKey } = await changePasswordAction(formData)

    
    
    
    if (success) {
      /**
       * also we need to update the Encryption Key
       */
  
      const email = formData.get("email") as string
      const schoolName = formData.get("school-name") as string
      const newPassword = formData.get("password") as string

      

      const newEncryptionKey = await getNewEncryptedKey(encryptedRecoveryKey!, schoolName, newPassword)

      await updateEncryptionKeyAction(email, newEncryptionKey)


      // clear local storage

      clearLocalStorage()

      toast({
        title: "Password Updated! 🎉"
      })
      router.push("/login")

    } else {

      console.log({ message });
      
      toast({
        title: message
      })
    }
  }

  return (
    <form action={formAction} ref={formRef} className="mt-10">

      <div className={`${currentStep === 0 ? "block" : "hidden"}`}>
        <EmailAndPasswordForm moveNext={handleNext} formRef={formRef} />
      </div>

      <div className={`${currentStep === 1 ? "block" : "hidden"}`}>
        <NewPassword />
      </div>
    </form>
  )
}

export default Form