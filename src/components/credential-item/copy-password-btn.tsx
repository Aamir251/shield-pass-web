"use client";

import { decryptPassword } from "@/lib/helpers/cipher";
import { Button } from "../ui/button";
import { useEncryptionKeyContext } from "@/providers/encryption-key";
import { useToast } from "@/hooks/use-toast";

/**
 * iv is the secret
 * password is the encrypted password
*/


type CopyPasswordButtonProps = {
  iv: string
  password: string
}


const CopyPasswordButton = ({ iv, password }: CopyPasswordButtonProps) => {

  const { encryptionKey } = useEncryptionKeyContext()
  const { toast } = useToast()


  const handleClick = async () => {

    await navigator.clipboard.writeText(await decryptPassword(password, iv, encryptionKey!))
    toast({
      title: "Password Copied! 🎉"
    })
  }

  return (
    <Button onClick={handleClick} size={"sm"} variant={"secondary"}>Copy Password</Button>
  )
}

export default CopyPasswordButton