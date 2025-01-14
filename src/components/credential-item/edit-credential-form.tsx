import { CredentialBasic, CredentialUpdate } from "@/types/credentials"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import LabelInputWrapper from "../forms/label-input-wrapper"

type EditCredentialFormProps = {
  credential: CredentialBasic | null

  open : boolean
  closeCallback : () => void

}

const EditCredentialForm = ({ open, closeCallback, credential }: EditCredentialFormProps) => {


  return (
    <Dialog open={open} onOpenChange={closeCallback} >
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
    </Dialog>
  )
}

export default EditCredentialForm




