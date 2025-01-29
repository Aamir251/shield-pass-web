"use client";


import { getEncryptionKeyFromLocalStorage } from "@/lib/helpers/cipher";
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerTrigger,
} from "@/components/ui/drawer"
import MasterPasswordPopupForm from "@/components/forms/master-password-popup-form";
import { useSession } from "next-auth/react";
import { removeDataFromLocalStorage } from "@/lib/helpers/utils";
import { LOCALSTORAGE_KEYS } from "@/constants";


type EncryptionKeyContextType = {
  encryptionKey: CryptoKey | null
}

export const EncryptionKeyContext = createContext<EncryptionKeyContextType | null>(null)


const EncryptionKeyContextProvider = ({ children }: PropsWithChildren) => {


  const session = useSession()

  const [ isDrawerOpen, setIsDrawerOpen ] = useState(false)


  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null)

  const successEncryptionCallback = (key : CryptoKey) => {
    setEncryptionKey(key)
    setIsDrawerOpen(false)
  }

  useEffect(() => {

    const init = async () => {
      const key = await getEncryptionKeyFromLocalStorage(session.data?.user.email!)
      if (!key?.extractable) {
        setIsDrawerOpen(true)

        removeDataFromLocalStorage(LOCALSTORAGE_KEYS.ENCRYPTION_KEY)
        removeDataFromLocalStorage(LOCALSTORAGE_KEYS.PRIVATE_KEY)
        removeDataFromLocalStorage(LOCALSTORAGE_KEYS.USER_EMAIL)

        // show the popup to enter master password 
      }

      setEncryptionKey(key)
      
    }


    init()

  }, [])

  const handleChange = () => {
    setIsDrawerOpen(false)
  }


  return <EncryptionKeyContext.Provider value={{
    encryptionKey,
  }}>
    {children}

    <Drawer open={isDrawerOpen} onOpenChange={handleChange} >
      <DrawerTrigger aria-hidden  className="hidden" asChild>
        <Button  variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <MasterPasswordPopupForm 
        successEncryptionCallback={successEncryptionCallback}
        email={session.data?.user.email!}
      />
    </Drawer>
  </EncryptionKeyContext.Provider>
}

export default EncryptionKeyContextProvider;


export const useEncryptionKeyContext = () => {
  const context = useContext(EncryptionKeyContext) as EncryptionKeyContextType

  if (!context) {
    throw new Error('useEncryptionKeyContext must be used within a EncryptionKeyContextProvider');
  }

  return context
}