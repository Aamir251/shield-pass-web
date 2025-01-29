import { PropsWithChildren } from "react"
import { Button } from "../ui/button"
import { DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer"
import { Input } from "../ui/input"
import LabelInputWrapper from "./label-input-wrapper"
import { encryptionKeyAction } from "@/actions/encryption-key-action"
import { decryptMainKey, storeEncryptionKeyLocally } from "@/lib/helpers/cipher"
import { useToast } from "@/hooks/use-toast"
import { saveDataToLocalStorage } from "@/lib/helpers/utils"
import { LOCALSTORAGE_KEYS } from "@/constants"


type Props = {
  successEncryptionCallback : (key : CryptoKey) => void
  email : string
}

const MasterPasswordPopupForm = (props : Props) => {
  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Enter Master Password</DrawerTitle>
          <DrawerDescription>Please enter your Password to continue</DrawerDescription>
        </DrawerHeader>
        <Form successEncryptionCallback={props.successEncryptionCallback} email={props.email} >

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



const Form = ({ children, successEncryptionCallback, email }: PropsWithChildren<Props>) => {

  const { toast } = useToast()
  const formAction = async (formData: FormData) => {

    try {
      const password = formData.get("password") as string

      if (!password) throw new Error("Please Enter Password!")

      // checking if user is valid or not
      const { encryptionKeyMain } = await encryptionKeyAction({ password })


      const encryptionKey = await decryptMainKey(encryptionKeyMain, password)

      await storeEncryptionKeyLocally(encryptionKey)

      saveDataToLocalStorage(LOCALSTORAGE_KEYS.USER_EMAIL, email)

      successEncryptionCallback(encryptionKey)

    } catch (error: any) {

      toast({
        title : error.message
      })
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