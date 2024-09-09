'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import LogOutButton from "./logout-button"

const TopNav = () => {
  const pathname = usePathname()
  return (
    <nav className="flex justify-center relative w-11/12 mx-auto">

      <div className="bg-black-one h-10 flex items-center rounded-sm overflow-hidden">
        <Link className={`app-nav-link ${pathname.includes("personal") && "active"}`} href="/personal/recents">
          <span className="relative z-10">Personal</span>
        </Link>
        <Link className={`app-nav-link ${pathname.includes("work") && "active"}`} href="/work/recents">
          <span className="relative z-10">Work</span>
        </Link>
      </div>


      <LogOutButton />
    </nav>
  )
}

export default TopNav