'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import LogOutButton from "./logout-button"

const TopNav = () => {
  const pathname = usePathname()
  return (
    <nav className="flex justify-center relative ">

      <LogOutButton />
    </nav>
  )
}

export default TopNav