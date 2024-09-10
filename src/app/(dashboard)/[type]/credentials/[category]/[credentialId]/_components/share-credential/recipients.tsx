import { Receipent } from "./popup"
import RecipientItem from "./RecipientItem"

type RecipientsProps = {
  recipients: Receipent[]
  credentialId: string
  onRemoveAccess: (removedRecipientId: string) => void
}

const Recipients = ({ recipients, credentialId, onRemoveAccess }: RecipientsProps) => {
  console.log("Recipients ", recipients)
  return (
    <div className="space-y-1.5 pt-5">
      <h5 className="text-primary-gray">Shared With</h5>
      <ul className="space-y-3">
        {
          recipients.map(recipient => <RecipientItem
            credentialId={credentialId}
            email={recipient.email}
            recipientId={recipient.id}
            onRemoveAccess={onRemoveAccess}
          />)
        }
      </ul>
    </div>
  )
}

export default Recipients