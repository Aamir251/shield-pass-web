import { CredentialBasic } from "@/types/credentials"
import Link from "next/link"
import Image from "next/image"
import CredentialItemBackground from "@/components/ui/credential-item-background"
import ShowMoreActionsButton from "./show-more-button"
import CredentialOverview from "./credential-overview"

type CredentialItemProps = {
  credential: CredentialBasic
}


const CredentialItem = ({ credential }: CredentialItemProps) => {
  
  return (
    <article
      className="relative p-6 border text-sm rounded-md overflow-hidden transition bg-card hover:bg-accent "
    >
      
      <CredentialOverview credential={credential} />
      <ShowMoreActionsButton />
      <CredentialItemBackground credentialId={credential.id} />

    </article>  
  )
}

export default CredentialItem