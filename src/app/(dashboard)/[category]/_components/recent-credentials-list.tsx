
import CredentialItem from "@/components/credential-item"
import { CredentialBasic } from "@/types/credentials"

type RecentCredentialsListProps = {
  credentials: CredentialBasic[]
}


const RecentCredentialsList = ({ credentials }: RecentCredentialsListProps) => {
  return (

    credentials.map(credential => <CredentialItem key={credential.id} credential={credential} />)
  )
}

export default RecentCredentialsList