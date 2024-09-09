"use client"

import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { useState } from "react"
import useSWR from "swr"
import ShareIcon from "@/assets/icons/share.svg"
import Image from "next/image"

const ShareCredentialPopup = dynamic(() => import("./share-credential/popup"), { ssr: false })


const ShareCredentialButton = () => {

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const pathname = usePathname()
  const arr = pathname.split("/")

  const credentialId = arr[arr.length - 1]

  const [showPopup, setShowPopup] = useState(false)

  const { data, error, mutate } = useSWR(`/api/credential-recipients?credentialId=${credentialId}`, fetcher)

  return (
    <>
      <button className="flex gap-1 items-center hover:opacity-70" onClick={setShowPopup.bind(null, true)}>
        <span>Share</span>
        <Image src={ShareIcon} alt="share credential" width={17} height={17} />
      </button>

      {showPopup && <ShareCredentialPopup
        recipientsData={data}
        credentialId={credentialId}
        closePopup={setShowPopup.bind(null, false)}
        mutate={mutate}
      />}

    </>
  )
}

export default ShareCredentialButton