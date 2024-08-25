"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <div className="absolute right-0">
      <button onClick={onClick} aria-disabled={isLoading} disabled={isLoading} className={`${isLoading && "cursor-wait"} `} >Logout</button>
    </div>
  )
}

export default LogOutButton