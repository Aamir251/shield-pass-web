import { CredentialBasic } from "@/types/credentials"
import ShowMoreActionsButton from "./show-more-button"
import CredentialOverview from "./credential-overview"
import CopyPasswordButton from "./copy-password-btn"

type CredentialItemProps = {
  credential: CredentialBasic
}


const CredentialItem = ({ credential }: CredentialItemProps) => {

  return (
    <article
      className="relative p-6 border text-sm rounded-md overflow-hidden transition bg-card hover:bg-accent "
    >

      <CredentialOverview credential={credential} />
      <ShowMoreActionsButton credential={credential} />
      <div  className="absolute bottom-5 right-3">
        <CopyPasswordButton iv={credential.iv} password={credential.password} />
      </div>
    </article>
  )
}

export default CredentialItem