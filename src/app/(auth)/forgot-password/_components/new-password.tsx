import LabelInputWrapper from "@/components/forms/label-input-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const NewPassword = () => {
  return (
    <div className="space-y-5">
      <LabelInputWrapper labelTitle="New Password">
        <Input type="password" placeholder="New Password" name="password" />
      </LabelInputWrapper>

      <LabelInputWrapper labelTitle="Confirm Password">
        <Input type="text" placeholder="Confirm password" name="confirm-password" />
      </LabelInputWrapper>


      <div className="flex justify-end">
        <Button type="submit" >Change Password</Button>
      </div>
    </div>
  )
}

export default NewPassword