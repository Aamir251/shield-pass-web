"use client"

import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { useState } from "react"
import useSWR from "swr"
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
      <button onClick={setShowPopup.bind(null, true)}>Share Credential</button>

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