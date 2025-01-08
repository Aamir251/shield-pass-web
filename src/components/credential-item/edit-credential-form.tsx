import { CredentialUpdate } from "@/types/credentials"
import { Button } from "../ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { PropsWithChildren } from "react"

type EditCredentialFormProps = {
  credential: CredentialUpdate | null
}

const EditCredentialForm = ({ credential }: EditCredentialFormProps) => {


  return (
    <DialogContent className="sm:max-w-[680px]">
      <DialogHeader>
        <DialogTitle>Edit Credential</DialogTitle>
        <DialogDescription>
          Make changes to your Credential here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>

      {/* ------------- Main Form Content ------- */}

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-x-6">
          <LabelInputWrapper labelTitle="Credential Name">
            <Input id="credential-name" defaultValue={credential?.name} className="col-span-3" />
          </LabelInputWrapper>
          <LabelInputWrapper labelTitle="Username" >
            <Input id="username" defaultValue={credential?.name} className="col-span-3" />
          </LabelInputWrapper>
        </div>

        <div className="grid grid-cols-2 gap-x-6">
          <LabelInputWrapper labelTitle="Email">
            <Input id="email" defaultValue={credential?.name} className="col-span-3" />
          </LabelInputWrapper>
          <LabelInputWrapper labelTitle="Password" >
            <Input id="password" defaultValue={credential?.name} className="col-span-3" />
          </LabelInputWrapper>
        </div>

        <div className="grid grid-cols-2 gap-x-6">
          <LabelInputWrapper labelTitle="Website Url ">
            <Input id="website-url" defaultValue={credential?.name} className="col-span-3" />
          </LabelInputWrapper>
     
        </div>


      </div>

      {/* ------------- Main Form Content Ends ------------- */}
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default EditCredentialForm




type LabelInputWrapperProps = PropsWithChildren<{
  labelTitle: string
}>

const LabelInputWrapper = ({ children, labelTitle }: LabelInputWrapperProps) => {
  return <div className="flex flex-col gap-y-3 items-left">
    <Label className="">
      {labelTitle}
    </Label>
    {children}
  </div>
}