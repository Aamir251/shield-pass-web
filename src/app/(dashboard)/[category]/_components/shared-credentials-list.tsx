import ErrorMessage from "@/components/ErrorMessage"
import { CredentialSharedWithMe } from "@/constants"
import SharedCredentialItem from "./shared-credential-item"

type Props = {
  credentials : CredentialSharedWithMe[]
}


const SharedCredentialsList = ({ credentials } : Props) => {

  if (!credentials.length) {
    return <ErrorMessage message="No Shared Credentials" />
  }
  return (
    credentials.map(credential => <SharedCredentialItem credential={credential} key={credential.id} />)
  )
}

export default SharedCredentialsList