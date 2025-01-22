import { CredentialBasic } from "@/types/credentials"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import LabelInputWrapper from "../forms/label-input-wrapper"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { CREDENTIAL_CATEGORIES } from "@/constants"


type EditCredentialFormProps = {
  credential: CredentialBasic | null

  open: boolean
  closeCallback: () => void

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
              <Input id="username" defaultValue={credential?.username} className="col-span-3" />
            </LabelInputWrapper>
          </div>

          <div className="grid grid-cols-2 gap-x-6">
            <LabelInputWrapper labelTitle="Email">
              <Input id="email" defaultValue={credential?.email} className="col-span-3" />
            </LabelInputWrapper>
            <LabelInputWrapper labelTitle="New Password" >
              <Input id="password"  type="password" placeholder="******" className="col-span-3" />
            </LabelInputWrapper>
          </div>

          <div className="grid grid-cols-2 gap-x-6">
            <LabelInputWrapper labelTitle="Website Url ">
              <Input id="website-url" defaultValue={credential?.websiteUrl} className="col-span-3" />
            </LabelInputWrapper>

            <LabelInputWrapper labelTitle="Category">
              <Select defaultValue={credential?.category} name="category">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="applications" />
                </SelectTrigger>
                <SelectContent>
                  {
                    CREDENTIAL_CATEGORIES.map(category => (
                      <SelectItem key={category} value={`${category}`}>{category}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
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




