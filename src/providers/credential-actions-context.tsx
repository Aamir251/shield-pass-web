"use client";


/**
 * This Context is for the selecting the credential that is to be updated / deleted
*/




import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";
import { Dialog } from "@/components/ui/dialog"

import { CredentialBasic, CredentialUpdate } from "@/types/credentials";
import EditCredentialForm from "@/components/credential-item/edit-credential-form";
import ShareCredentialPopup from "@/components/share-credential-popup";
import { Sheet } from "@/components/ui/sheet";
import { usePathname, useRouter, useSearchParams } from "next/navigation";




type createContextProps = {
  setSelectedCredential: Dispatch<SetStateAction<CredentialBasic | null>>
  selectedCredential: CredentialBasic | null
}
export const CredentialActionContext = createContext<createContextProps>({
  setSelectedCredential: () => { },
  selectedCredential: null
})


type CredentialsActionProviderProps = PropsWithChildren<{

}>

const CredentialActionContextProvider = ({ children }: CredentialsActionProviderProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()


  const [selectedCredential, setSelectedCredential] = useState<CredentialBasic | null>(null)

  const shouldShowSharePopup = searchParams.has("share") ? true : false

  console.log({ shouldShowSharePopup: searchParams.has("share") });

  const handleChange = () => {
    const nextSearchParams = new URLSearchParams(searchParams.toString())

    nextSearchParams.delete("share")
    nextSearchParams.delete("edit")

    router.replace(`${pathname}`)
  }


  const shouldShowEditPopup = searchParams.has("edit") ? true : false


  return (
    <CredentialActionContext.Provider value={{
      setSelectedCredential,
      selectedCredential
    }}>
      <Dialog>
        <EditCredentialForm open={shouldShowEditPopup} closeCallback={handleChange} credential={selectedCredential} />
      </Dialog>
      <ShareCredentialPopup isOpen={shouldShowSharePopup} closeCallback={handleChange} />

      {children}



    </CredentialActionContext.Provider>
  )
}

export default CredentialActionContextProvider;


export const useCredentialActionContext = () => {

  const context = useContext(CredentialActionContext)

  if (!context) {
    throw new Error('useCredentialActionContext must be used within a CredentialsActionContextProvider');
  }

  return context
}

