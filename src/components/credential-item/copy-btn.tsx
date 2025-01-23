
"use client";

import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

type CopyButtonProps = {
  textToCopy : string
}

const CopyButton = ({ textToCopy } : CopyButtonProps ) => {

  const { toast } = useToast()

  const onClick = async () => {
    await navigator.clipboard.writeText(textToCopy)
    toast({
      title : "Copied! 🎉"
    })
  }
  
  return (
    <Copy className="cursor-pointer" onClick={onClick} size={17} />
  )
}

export default CopyButton