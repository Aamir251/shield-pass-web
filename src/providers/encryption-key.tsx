"use client";


import { getKeyFromLocalStorage } from "@/lib/helpers/encryption-decryption";
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import MasterPasswordPopupForm from "@/components/forms/master-password-popup-form";


type CreateContextProps = {
  encryptionKey: CryptoKey | null
}

export const EncryptionKeyContext = createContext<CreateContextProps>({
  encryptionKey: null,
})


const EncryptionKeyContextProvider = ({ children }: PropsWithChildren) => {

  const [ isDrawerOpen, setIsDrawerOpen ] = useState(false)


  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null)

  const successEncryptionCallback = (key : CryptoKey) => {
    setEncryptionKey(key)
    setIsDrawerOpen(false)
  }

  useEffect(() => {

    const init = async () => {
      const key = await getKeyFromLocalStorage()
      if (!key?.extractable) {
        setIsDrawerOpen(true)

        // show the popup to enter master password 
      }
    }


    init()

  }, [])

  const handleChange = () => {
    console.log({ isDrawerOpen });
  }


  return <EncryptionKeyContext.Provider value={{
    encryptionKey,
  }}>
    {children}

    <Drawer open={isDrawerOpen} onOpenChange={handleChange} >
      <DrawerTrigger  className="hidden" asChild>
        <Button  variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <MasterPasswordPopupForm 
        successEncryptionCallback={successEncryptionCallback} 
      />
    </Drawer>
  </EncryptionKeyContext.Provider>
}

export default EncryptionKeyContextProvider;


export const useEncryptionKeyContext = () => {
  const context = useContext(EncryptionKeyContext)

  if (!context) {
    throw new Error('useEncryptionKeyContext must be used within a EncryptionKeyContextProvider');
  }
}