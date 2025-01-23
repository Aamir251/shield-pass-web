"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const LogOutButton = () => {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onClick = async () => {
    try {
      setIsLoading(true)
      await signOut({ redirect: false })

      router.push("/login")
    } catch (error) {
      console.log({ error });

    }
  }

  return (
    <div className={`absolute right-5 lg:right-10 top-5 `}>
      <Button onClick={onClick} variant="outline" className={`inline-flex items-center space-x-2 cursor-pointer ${isLoading && " cursor-wait"}`}>
        <LogOutIcon className="h-6 w-6" />
        <span>Logout</span>
      </Button>
    </div>
  )
}

export default LogOutButton


function LogOutIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}