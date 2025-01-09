import { PropsWithChildren } from "react"
import { Button } from "../ui/button"
import { DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer"
import { Input } from "../ui/input"
import LabelInputWrapper from "./label-input-wrapper"
import toast from "react-hot-toast"
import { masterPasswordFormAction } from "@/actions/master-password-action"
import { generatePublicEncryptionKey, storeKeyLocally } from "@/lib/helpers/encryption-decryption"


type Props = {
  successEncryptionCallback : (key : CryptoKey) => void
}

const MasterPasswordPopupForm = (props : Props) => {
  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Enter Master Password</DrawerTitle>
          <DrawerDescription>Please enter your Password to continue</DrawerDescription>
        </DrawerHeader>
        <Form successEncryptionCallback={props.successEncryptionCallback} >

          <DrawerFooter>
            <Button type="submit">Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </Form>
      </div>
    </DrawerContent>
  )
}

export default MasterPasswordPopupForm



const Form = ({ children, successEncryptionCallback }: PropsWithChildren<Props>) => {

  const formAction = async (formData: FormData) => {

    try {
      const password = formData.get("password") as string

      if (!password) throw new Error("Please Enter Password!")

      // checking if user is valid or not
      const { email } = await masterPasswordFormAction({ password })

      if (!email) throw new Error("Invalid Password")

      // generate encryption key
      const key = await generatePublicEncryptionKey(email, password);

      await storeKeyLocally(key)

      successEncryptionCallback(key)

    } catch (error: any) {

      toast.error(error.message)
    }

  }

  return <form action={formAction} className="w-full">
    <div className="p-4">
      <LabelInputWrapper labelTitle="Password">
        <Input type="password" className="w-full" name="password" />
      </LabelInputWrapper>
    </div>

    {children}

  </form>
}