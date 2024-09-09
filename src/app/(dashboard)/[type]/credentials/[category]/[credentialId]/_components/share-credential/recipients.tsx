import { Receipent } from "./popup"
import RecipientItem from "./RecipientItem"

type RecipientsProps = {
  recipients: Receipent[]
}

const Recipients = ({ recipients }: RecipientsProps) => {
  return (
    <div className="space-y-1.5 pt-5">
      <h5 className="text-primary-gray">Shared With</h5>
      <ul className="space-y-3">
        {
          // recipients.map(recipient => <RecipientItem userId={recipient} />)
        }
      </ul>
    </div>
  )
}

export default Recipients