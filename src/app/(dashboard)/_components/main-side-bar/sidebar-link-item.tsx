"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link"

export type SideBarLinkItemType = {
  title: string
  href: string
  currentPageUrl : string
  Icon : LucideIcon
}

const SideBarLinkItem = ({ title, href, Icon }: SideBarLinkItemType) => {

  return (
    <Link href={href} className={`flex gap-x-3 py-2.5 rounded-sm items-center w-full px-5 text-sm hover:bg-secondary`}>
      <Icon size={18} />
      {title}
    </Link>
  )
}

export default SideBarLinkItem