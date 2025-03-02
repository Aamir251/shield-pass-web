'use client'

import { usePathname } from "next/navigation"
import LogOutButton from "./logout-button"
import SearchBar from "../searchbar"

const TopNav = () => {
  const pathname = usePathname()
  return (
    <nav className="flex justify-center relative ">

      <SearchBar />
      <LogOutButton />
    </nav>
  )
}

export default TopNav