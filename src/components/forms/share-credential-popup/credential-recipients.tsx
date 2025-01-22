import { CircleMinus } from "lucide-react"

type CredentialRecipientsProps = {
  recipients: {
    email: string
  }[]

  removeAccessCallback : (recipientEmail : string) => void
}


const CredentialRecipients = ({ recipients, removeAccessCallback }: CredentialRecipientsProps) => {
  
  return (
    <>
    <h6 className="mt-6">Credentials Shared With : </h6>
    <ul className="space-y-3 mt-2.5">
      {recipients.map(recipient => <CredentialRecipient 
        removeAccessCallback={removeAccessCallback.bind(null, recipient.email)}
        email={recipient.email} 
        key={recipient.email} 
      /> )}
    </ul>
    </>
  )
}

export default CredentialRecipients



type CredentialRecipientProps = {
  email : string
  removeAccessCallback : () => void

}
const CredentialRecipient = ({ email, removeAccessCallback } : CredentialRecipientProps) => {



  return (
    <li className="list-none px-3 py-2 recipient-item relative bg-input/30 rounded-sm text-sm flex gap-x-3 justify-between">
      <span className="max-w-[150px] block truncate">{email}</span>
      <CircleMinus onClick={removeAccessCallback} className="cursor-pointer" size={19} />

      <span className="recipient-tooltip">{email}</span>
    </li>
  )
}