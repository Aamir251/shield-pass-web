import { CredentialBasic } from "@/types/credentials"
import Image from "next/image"
import CopyButton from "./copy-btn"
import CredentialImage from "./credential-image"

type CredentialOverviewProps = {
  credential: CredentialBasic
}

function getCredentialDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(date)
}


const CredentialOverview = (
  { credential: { websiteUrl, name, updatedAt, email, username } }: CredentialOverviewProps
) => {

  return (
    <>
      <div className="flex items-center gap-x-3">
        <figure className="h-8 w-8 bg-[#22222A] text-white rounded-md flex-center">
          {
            websiteUrl ? <CredentialImage url={websiteUrl} name={name} /> : <h4>{name.charAt(0)}</h4>
          }
        </figure>
        <h4 className="text-primary-white">{name}</h4>
      </div>


      <div className="mt-4 space-y-3">
        {email && <div className="flex  items-center justify-between">
          <h5 className="">{email}</h5>
          <CopyButton textToCopy={email} />
        </div>}
        {username && <div className="flex  items-center justify-between">
          <h5 className="">{username}</h5>
          <CopyButton textToCopy={username} />
        </div>}
        { updatedAt && <p className="text-xs text-primary-gray mt-8 absolute bottom-3">Last Updated : {getCredentialDate(new Date(updatedAt))}</p>}
      </div>
    </>
  )
}

export default CredentialOverview