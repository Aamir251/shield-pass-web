"use client";

import Image from "next/image"
import { useState } from "react";

type Props = {
  url: string
  name : string
}


const CredentialImage = ({ url, name }: Props) => {

  const [ isLoadSuccessful, setIsLoadSuccessful ] = useState(true)

  if (!isLoadSuccessful) {
    return (
      <h4>{name.charAt(0)}</h4>
    )
  }

  return (
    <Image
      alt={name}
      height="16" width="16"
      src={`http://www.google.com/s2/favicons?domain=${url}`}
      onError={() => {
        setIsLoadSuccessful(false)
        
      }}
    />
  )
}

export default CredentialImage