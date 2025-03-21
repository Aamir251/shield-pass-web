"use client";


/**
 * This Context is for the selecting the credential that is to be updated / deleted
*/




import { createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog"

import { CredentialBasic, CredentialUpdate } from "@/types/credentials";
import EditCredentialForm from "@/components/forms/edit-credential-form";
import ShareCredentialPopup from "@/components/forms/share-credential-popup";
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

  
  const removequeryParams = useCallback(() => {
    if (typeof window === "undefined") return
    const nextSearchParams = new URLSearchParams(searchParams.toString())
    
    nextSearchParams.delete("share")
    nextSearchParams.delete("edit")
    
    router.replace(`${pathname}`)
    
  },[searchParams, router, pathname ])
  
  useEffect(() => {
    if (!selectedCredential && !searchParams.has("search")) {
      removequeryParams()
    }
  },[selectedCredential, searchParams, removequeryParams])
  
  
  const shouldShowSharePopup = searchParams.has("share") && selectedCredential ? true : false
  const shouldShowEditPopup = searchParams.has("edit") && selectedCredential ? true : false



  return (
    <CredentialActionContext.Provider value={{
      setSelectedCredential,
      selectedCredential
    }}>
      <Dialog>
        <EditCredentialForm open={shouldShowEditPopup} closeCallback={removequeryParams} credential={selectedCredential} />
      </Dialog>
      {shouldShowSharePopup && <ShareCredentialPopup isOpen={shouldShowSharePopup} closeCallback={removequeryParams} />}

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

