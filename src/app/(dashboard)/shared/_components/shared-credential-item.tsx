import CredentialThumbnail from "@/components/ui/credential-thumbnail"
import { formatWebsiteUrl } from "@/lib/helpers/utils"
import Image from "next/image"
import Link from "next/link"


type CredentialListItemProps = {
  credential: {
    id: string,
    password: string,
    name: string,
    email: string
    websiteUrl: string
  }
}

const SharedCredentialItem = ({ credential }: CredentialListItemProps) => {
  return (
    <Link target="_blank" href={`${formatWebsiteUrl(credential.websiteUrl)}`}
      className="flex-center flex-col bg-secondary-dark py-3 px-5 rounded-md"
    >
      <div className="flex items-center gap-x-3 rounded-md relative">
        <CredentialThumbnail
          credentialName={credential.name}
          websiteUrl={credential.websiteUrl}
        />
      </div>

      <div className="text-center space-y-2">
        <h4 className="font-semibold text-primary-white">{credential.name}</h4>

        <h5 className="font-medium text-secondary-white text-sm">{credential.email}</h5>

        <button className="btn-primary px-5 py-1 text-sm font-semibold rounded-sm">Launch</button>
      </div>

    </Link>
  )
}

export default SharedCredentialItem