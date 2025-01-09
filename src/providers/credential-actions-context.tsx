
/**
 * This Context is for the selecting the credential that is to be updated / deleted
*/




import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";
import { Dialog } from "@/components/ui/dialog"

import { CredentialUpdate } from "@/types/credentials";
import EditCredentialForm from "@/components/credential-item/edit-credential-form";




type createContextProps = {
  setCredentialToUpdate: Dispatch<SetStateAction<CredentialUpdate | null>>
}
export const CredentialActionContext = createContext<createContextProps>({
  setCredentialToUpdate: () => { }
})


type CredentialsActionProviderProps = PropsWithChildren<{

}>

const CredentialActionContextProvider = ({ children }: CredentialsActionProviderProps) => {

  const [ credentialToUpdate, setCredentialToUpdate ] = useState<CredentialUpdate | null>(null)


  return (
    <CredentialActionContext.Provider value={{
      setCredentialToUpdate
    }}>
      <Dialog>
        
        {children}
        <EditCredentialForm credential={credentialToUpdate} />
      </Dialog>
    </CredentialActionContext.Provider>
  )
}

export default CredentialActionContextProvider;


export const useCredentialActionContext = () => {

  const context = useContext(CredentialActionContext)
  
  if (!context) {
    throw new Error('useCredentialActionContext must be used within a CredentialsActionContextProvider');
  }
}