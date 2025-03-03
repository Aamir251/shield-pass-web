import LabelInputWrapper from "@/components/forms/label-input-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StepFormProps } from "./utils"
import { useToast } from "@/hooks/use-toast"
import { schoolNameAction } from "../_action"
import { useState } from "react"

const EmailAndPasswordForm = ({ moveNext, formRef }: StepFormProps) => {

  const { toast } = useToast()

  const [ loading, setIsLoading ] = useState<boolean>(false)

  const handleClick = async () => {
    setIsLoading(true)

    if (!formRef.current) return

    const { success, message } = await schoolNameAction(new FormData(formRef.current))
    
    if (!success) {
      toast({
        title : message
      })
      setIsLoading(false)
      return
    }

    moveNext && moveNext(new FormData(formRef.current).get("email") as string )

  }

  return (
    <>
      <div className="space-y-7">
        <LabelInputWrapper labelTitle="Email :" >
          <Input placeholder="email" type="email" name="email" required />
        </LabelInputWrapper>

        <LabelInputWrapper labelTitle="Your first school name :" >
          <Input placeholder="Cloud Kindergarten" type="email" name="school-name" required />
        </LabelInputWrapper>
      </div>

      <div className="flex justify-end mt-4">
        <Button disabled={loading} aria-disabled={loading} type="button" onClick={handleClick} variant={"secondary"}>Proceed</Button>
      </div>
    </>
  )
}

export default EmailAndPasswordForm