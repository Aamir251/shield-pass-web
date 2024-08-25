import { CredentialBasic } from "@/types/credentials"
import Link from "next/link"
import Image from "next/image"
import CredentialItemBackground from "@/components/ui/credential-item-background"

type CredentialItemProps = {
  credential: CredentialBasic
}

const CredentialItem = ({ credential }: CredentialItemProps) => {

  return (
    <Link
      href={`${process.env.NEXTAUTH_URL}/${credential.type.toLowerCase()}/credentials/${credential.category.toLowerCase()}/${credential.id}`}
      className="flex items-center gap-x-3 rounded-md relative py-4 px-2"
    >
      <figure className="h-10 w-10 bg-[#22222A] text-white rounded-md flex-center">
        <Image alt={credential.name} height="16" width="16" src={`http://www.google.com/s2/favicons?domain=${credential.websiteUrl}`} />
      </figure>

      <div>
        <h4 className="font-semibold text-primary-white">{credential.name}</h4>
        <h5 className="font-medium text-secondary-white text-sm">{credential.email}</h5>
      </div>

      <CredentialItemBackground credentialId={credential.id} />
    </Link>
  )
}

export default CredentialItem