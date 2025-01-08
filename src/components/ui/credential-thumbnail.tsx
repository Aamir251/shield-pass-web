import Image from "next/image"

type CredentialThumbnailProps = {
  websiteUrl : string | undefined
  credentialName : string
}

export default function CredentialThumbnail({ websiteUrl, credentialName } : CredentialThumbnailProps) {


  
  return <figure className="h-10 w-10 bg-[#22222A] text-white rounded-md flex-center">
    {
      websiteUrl ? <Image alt={credentialName} height="16" width="16" src={`http://www.google.com/s2/favicons?domain=${websiteUrl}`} />
      : <h3>{credentialName.charAt(0)}</h3>
    }
  </figure>
}