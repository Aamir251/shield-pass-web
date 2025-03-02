"use client";

import { PenLine } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";

const AddCredentialLink = () => {


  const pathname = usePathname()

  if (pathname.includes("new-credential")) return null

  return (

    <Link 
      href={"/new-credential"} 
      className="flex gap-x-3 items-center fixed 
            bottom-5 right-[3%] bg-foreground text-background 
            px-4 py-2 rounded-sm shadow text-sm font-medium transition hover:bg-foreground/70"
      >
      <PenLine size={15} />
      <span>Add Credential</span>
    </Link>

  )
}

export default AddCredentialLink