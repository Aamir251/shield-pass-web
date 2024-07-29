"use client";


import Link from "next/link"


type LinkTypes = `/credentials/${string}` | `debitcards/${string}`

export type SideBarLinkItemType = {
  title: string
  href: string
  currentUrlPathname: string
}


const SideBarLinkItem = ({ title, href, currentUrlPathname }: SideBarLinkItemType) => {

  return (
    <Link href={href} className={`block sidebar-link ${currentUrlPathname === href ? "active" : ""}`}>
      {title}
    </Link>
  )
}

export default SideBarLinkItem