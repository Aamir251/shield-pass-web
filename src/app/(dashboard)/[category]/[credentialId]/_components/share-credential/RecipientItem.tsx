import { showSuccessToastMessage, showToastErrorMessage } from "@/lib/helpers/toast"
import { removeCredentialAccessAction } from "../../_actions/remove-credential-access"
import RemoveAccessButton from "./remove-access-btn"


type RecipientItemProps = {
  recipientId: string // Id of the recipient
  email: string // Email address of the Recipient
  credentialId: string
  onRemoveAccess: (removedRecipientId: string) => void

}

const RecipientItem = ({ recipientId, email, credentialId, onRemoveAccess }: RecipientItemProps) => {

  const formAction = async (formData: FormData) => {
    try {
      const { success, message } = await removeCredentialAccessAction(credentialId, formData)

      if (!success) throw new Error(message)

      showSuccessToastMessage(`Access Removed from ${email}`)
      onRemoveAccess(recipientId)

    } catch (error: any) {

      showToastErrorMessage(error.message)

    }

  }

  return (
    <form action={formAction} className="px-3 py-2 text-sm bg-black-one text-secondary-white rounded-md block flex justify-between items-center">
      <input aria-hidden={true} name="recipientId" hidden={true} defaultValue={recipientId} readOnly={true} aria-readonly={true} />
      <span>{email}</span>
      <RemoveAccessButton />
    </form>
  )
}

export default RecipientItem