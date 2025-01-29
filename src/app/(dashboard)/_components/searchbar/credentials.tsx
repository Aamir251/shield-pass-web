import Link from "next/link";
import { CredentialSearchItem } from "."
import Image from "next/image";
import { CredentialsType } from "@/types/credentials";


type CredentialsProps = {
  credentials: CredentialSearchItem[]
  credentialType: CredentialsType
}

const Credentials = ({ credentials, credentialType }: CredentialsProps) => {


  if (!credentials.length) {
    return <p className="text-sm">No Credentials Found</p>
  }
  return credentials.map(credential => <Link key={credential.id}
    className="text-sm pl-3 block py-2.5 rounded-sm hover:bg-primary-dark"
    href={`/${credentialType}/credentials/${credential.category.toLocaleLowerCase()}/${credential.id}`}
  >
    <div className="flex items-center gap-x-3" >
      <figure>
        <Image
          width={20}
          height={20}
          alt={credential.name}
          src={`http://www.google.com/s2/favicons?domain=${credential.websiteUrl}`} />
      </figure>
      <div>
        <h5>{credential.name}</h5>
        <p className="text-primary-gray text-xs">{credential.email}</p>
      </div>
    </div>

  </Link>)
}

export default Credentials