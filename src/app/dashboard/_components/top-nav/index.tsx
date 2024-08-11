'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const TopNav = () => {
  const pathname = usePathname()
  return (
    <nav className="w-max mx-auto bg-black-one h-10 flex items-center rounded-sm overflow-hidden">

      <Link className={`app-nav-link ${pathname.includes("personal") && "active"}`} href="/dashboard/personal/recents">
        <span className="relative z-10">Personal</span>
      </Link>
      <Link className={`app-nav-link ${pathname.includes("work") && "active"}`} href="/dashboard/work/recents">
        <span className="relative z-10">Work</span>
      </Link>
      <Link className={`app-nav-link ${pathname.includes("business") && "active"}`} href="/dashboard/business/recents">
        <span className="relative z-10">Business</span>
      </Link>
    </nav>
  )
}

export default TopNav