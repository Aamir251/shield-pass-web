import { Credential } from "@prisma/client"
import Image from "next/image"

type CredentialHeadingProps = Pick<Credential, "websiteUrl" | "name" | "email">


const CredentialHeading = ({ websiteUrl, name, email }: CredentialHeadingProps) => {
  return (
    <div className="flex gap-x-2 items-center">
      <figure className="h-12 w-12 flex-center bg-[#22222A] rounded-md">
        <Image alt={name} width={16} height={16} src={`http://www.google.com/s2/favicons?domain=${websiteUrl}`} />
      </figure>

      <div>
        <h2 className="text-lg font-medium text-primary-gray">{name}</h2>
        <h5 className="text-primary-white text-sm" >{email}</h5>
      </div>
    </div>
  )
}

export default CredentialHeading