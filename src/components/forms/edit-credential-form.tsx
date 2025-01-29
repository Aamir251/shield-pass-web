"use client";

import { CredentialBasic } from "@/types/credentials"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import LabelInputWrapper from "../forms/label-input-wrapper"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { CREDENTIAL_CATEGORIES } from "@/constants"
import { useEncryptionKeyContext } from "@/providers/encryption-key";
import { encryptCredentialPassword } from "@/lib/helpers/cipher";
import { editCredentialAction } from "./actions/edit-credential-action";
import { useToast } from "@/hooks/use-toast";


type EditCredentialFormProps = {
  credential: CredentialBasic | null

  open: boolean
  closeCallback: () => void

}

function getFieldsThatHaveChanged(originalData: CredentialBasic, newData: FormData) {

  const changedFields: string[] = []
  for (const element of newData.entries()) {

    const isFieldCredentialId = element[0] === "credentialId";

    const isValueDifferent: boolean = originalData[element[0] as keyof CredentialBasic] !== newData.get(`${element[0]}`)
    const doesContainData: boolean = String(newData.get(`${element[0]}`)).length > 0
    if (isValueDifferent && doesContainData && !isFieldCredentialId) {
      changedFields.push(`${element[0]}`)
    }
  }

  return changedFields
  // return newData.entries().filter(field => {
  //   return originalData[field[0] as keyof CredentialBasic] !== newData.get(`${field[0]}`)
  // })

}

const EditCredentialForm = ({ open, closeCallback, credential }: EditCredentialFormProps) => {

  const { encryptionKey } = useEncryptionKeyContext()
  const { toast } = useToast()

  const formAction = async (formData: FormData) => {

    /**
     * We only need to send those fields that have changed
    */

    const fieldsThatHaveChanged = getFieldsThatHaveChanged(credential!, formData)

    if (fieldsThatHaveChanged.includes("password")) {
      const newPassword = formData.get("password") as string

      
      if (newPassword.length) {
        // encrypt this password using the secret encryption key
        const { data, iv } = await encryptCredentialPassword(newPassword, encryptionKey!)
        formData.set("password", JSON.stringify({
          iv,
          data
        }))
      }

      

    }


    const { success, message } = await editCredentialAction(formData, fieldsThatHaveChanged)

    if (success) {
      toast({
        title : "Credential Updated 🎉"
      })
    } else {
      toast({
        title : `${message}`
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={closeCallback} >
      <DialogContent className=" w-11/12 lg:w-full sm:max-w-[680px] px-3 lg:px-8">
        <DialogHeader>
          <DialogTitle>Edit Credential</DialogTitle>
          <DialogDescription>
            Make changes to your Credential here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        {/* ------------- Main Form Content ------- */}

        <form action={formAction}>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-x-3 lg:gap-x-6">
              <Input className="hidden" aria-hidden defaultValue={credential?.id!} readOnly aria-readonly name="credentialId" />
              <LabelInputWrapper labelTitle="Credential Name">
                <Input id="credential-name" name="name" defaultValue={credential?.name} className="col-span-3" />
              </LabelInputWrapper>
              <LabelInputWrapper labelTitle="Username" >
                <Input id="username" name="username" defaultValue={credential?.username} className="col-span-3" />
              </LabelInputWrapper>
            </div>

            <div className="grid grid-cols-2 gap-x-3 lg:gap-x-6">
              <LabelInputWrapper labelTitle="Email">
                <Input id="email" name="email" defaultValue={credential?.email} className="col-span-3" />
              </LabelInputWrapper>
              <LabelInputWrapper labelTitle="New Password" >
                <Input id="password" type="password" name="password" placeholder="******" className="col-span-3" />
              </LabelInputWrapper>
            </div>

            <div className="grid grid-cols-2 gap-x-3 lg:gap-x-6">
              <LabelInputWrapper labelTitle="Website Url ">
                <Input id="website-url" name="websiteUrl" defaultValue={credential?.websiteUrl} className="col-span-3" />
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
          <DialogFooter className="mt-6">
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditCredentialForm




