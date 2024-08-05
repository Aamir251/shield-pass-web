"use client";

import { usePathname } from "next/navigation";
import SideBarLinkItem from "./sidebar-link-item"
import { CredentialsType } from "@/types/credentials";

const MainSideBar = ({ pageType = "private" }: { pageType: CredentialsType }) => {

  const pathname = usePathname()

  return (
    <aside className="mt-20 space-y-6 text-secondary-white font-medium flex-grow max-w-40">

      <SideBarLinkItem currentUrlPathname={pathname} href={`/dashboard/${pageType}/recents`} title="RECENTS" />

      <div className="space-y-4">
        <p className={`${pathname.includes("credentials") && "text-primary-blue"}`}>CREDENTIALS</p>

        <CredentialsTypeList pathname={pathname} pageType={pageType} />
      </div>

      <SideBarLinkItem currentUrlPathname={pathname} href={`/dashboard/${pageType}/debit-cards`} title="DEBIT CARDS" />

      <SideBarLinkItem currentUrlPathname={pathname} href={`/dashboard/${pageType}/credit-cards`} title="CREDIT CARDS" />

    </aside>
  )
}

export default MainSideBar

const CredentialsTypeList = ({ pageType, pathname }: { pageType: string, pathname: string }) => {

  const items = [
    { title: "Logins", href: `/dashboard/${pageType}/credentials/logins` },
    { title: "Websites", href: `/dashboard/${pageType}/credentials/websites` },
    { title: "Apps", href: `/dashboard/${pageType}/credentials/apps` },
    { title: "Socials", href: `/dashboard/${pageType}/credentials/socials` },
  ]
  return <ul className="flex flex-col gap-y-3 pl-3">
    {
      items.map(item => <SideBarLinkItem currentUrlPathname={pathname} key={item.href} href={item.href} title={item.title} />)
    }
  </ul>
}