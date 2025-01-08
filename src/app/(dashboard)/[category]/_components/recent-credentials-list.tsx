
import CredentialItem from "@/components/credential-item"
import { CredentialBasic } from "@/types/credentials"

type RecentCredentialsListProps = {
  credentials : CredentialBasic[]
}


const RecentCredentialsList = ({ credentials } : RecentCredentialsListProps) => {
  return (
    <div className="grid grid-cols-3 gap-x-3">
      {
        credentials.map(credential => <CredentialItem credential={credential} />)
      }
    </div>
  )
}

export default RecentCredentialsList