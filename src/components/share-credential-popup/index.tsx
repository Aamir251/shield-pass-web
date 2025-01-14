"use client";

import useSWR from "swr";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import ShareCredentialForm from "./form";
import { useCredentialActionContext } from "@/providers/credential-actions-context";



type Props = {
  isOpen : boolean
  closeCallback : () => void
  // credentialId : string | undefined
}

const ShareCredentialPopup = ({ isOpen, closeCallback }: Props) => {

  const { selectedCredential } = useCredentialActionContext()

  console.log({ selectedCredential })
  const fetcher = (url: string) => fetch(url).then(res => res.json())

  const { data, error, mutate } = useSWR(`/api/credential-recipients?credentialId=${selectedCredential?.id}`, fetcher)

  return (
    <Sheet open={isOpen} onOpenChange={closeCallback} >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Share Your Credential</SheetTitle>
          <SheetDescription>
            Share your credential to others without ever revealing your password. You can also remove access.
          </SheetDescription>
        </SheetHeader>

        <ShareCredentialForm mutate={mutate} recipientsData={data} credential={selectedCredential} />
      </SheetContent>
    </Sheet>
  )
}

export default ShareCredentialPopup