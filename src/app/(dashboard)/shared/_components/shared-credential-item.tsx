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
        <figure className="h-10 w-10 bg-[#22222A] text-white rounded-md flex-center">
          <Image alt={credential.name} height="16" width="16" src={`http://www.google.com/s2/favicons?domain=${credential.websiteUrl}`} />
        </figure>
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