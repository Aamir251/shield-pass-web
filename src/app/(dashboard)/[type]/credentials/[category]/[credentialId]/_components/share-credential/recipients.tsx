import { Receipent } from "./popup"

type RecipientsProps = {
  recipients: Receipent[]
}

const Recipients = ({ recipients }: RecipientsProps) => {
  return (
    <div className="space-y-1.5 pt-5">
      <h5 className="text-primary-gray">Shared With</h5>
      <ul className="space-y-3">
        {
          recipients.map((recipient, index) => (
            <li className="px-3 py-2 text-sm bg-black-one text-secondary-white rounded-md block" key={`${recipient.email}-${index}`}>{recipient.email}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Recipients