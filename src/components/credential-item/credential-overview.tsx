import { CredentialBasic } from "@/types/credentials"
import Image from "next/image"

type CredentialOverviewProps = {
  credential : CredentialBasic
}

function getCredentialDate(date : Date) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle : "medium"}).format(date)
}


const CredentialOverview = (
  { credential : { websiteUrl, name, updatedAt, email } } : CredentialOverviewProps
) => {
  return (
    <>
      <div className="flex items-center gap-x-3">
        <figure className="h-8 w-8 bg-[#22222A] text-white rounded-md flex-center">
          {
            websiteUrl ? <Image
              alt={name}
              height="16" width="16"
              src={`http://www.google.com/s2/favicons?domain=${websiteUrl}`}
            /> : <h4>{name.charAt(0)}</h4>
          }
        </figure>
        <h4 className="text-primary-white">{name}</h4>
      </div>


      <div className="mt-4">
        <h5 className="">{email}</h5>

        <p className="text-xs text-primary-gray mt-4">Last Updated : {getCredentialDate(updatedAt)}</p>
      </div>
    </>
  )
}

export default CredentialOverview