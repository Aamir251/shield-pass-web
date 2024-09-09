"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LogoutIcon from "@/assets/icons/logout.svg"

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
    <div className={`absolute right-0 flex gap-x-2 text-sm border border-gray-500 px-3 py-1.5 rounded-sm text-gray-300 hover:opacity-70 cursor-pointer ${isLoading && " cursor-wait"}`}>
      <button onClick={onClick} aria-disabled={isLoading} disabled={isLoading} className={` `} >Logout</button>
      <Image src={LogoutIcon} alt="logout" width={22} height={22} />
    </div>
  )
}

export default LogOutButton