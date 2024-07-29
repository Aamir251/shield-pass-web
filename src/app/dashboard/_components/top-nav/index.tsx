'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const TopNav = () => {
  const pathname = usePathname()
  return (
    <nav className="w-max mx-auto bg-black-one h-10 flex items-center rounded-sm overflow-hidden">

      <Link className={`app-nav-link ${pathname.includes("private") && "active"}`} href="/private/recents">
        <span className="relative z-10">Private</span>
      </Link>
      <Link className={`app-nav-link ${pathname.includes("work") && "active"}`} href="/work/recents">
        <span className="relative z-10">Work</span>
      </Link>
      <Link className={`app-nav-link ${pathname.includes("business") && "active"}`} href="/business/recents">
        <span className="relative z-10">Business</span>
      </Link>
    </nav>
  )
}

export default TopNav