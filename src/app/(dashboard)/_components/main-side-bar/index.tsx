"use client";

import { usePathname } from "next/navigation";
import SideBarLinkItem from "./sidebar-link-item"
import { CREDENTIAL_TYPES } from "@/constants";

const MainSideBar = () => {

  const pathname = usePathname()

  let credentialType = pathname.split("/")[1]

  credentialType = CREDENTIAL_TYPES.includes(credentialType) ? credentialType : "personal"

  return (
    <aside className="mt-40 space-y-6 text-secondary-white font-medium flex-grow max-w-40">

      <SideBarLinkItem currentUrlPathname={pathname} href={`/${credentialType}/recents`} title="RECENTS" />

      <div className="space-y-4">
        <p className={`${pathname.includes("credentials") && "text-primary-blue"}`}>CREDENTIALS</p>

        <CredentialsTypeList pathname={pathname} credentialType={credentialType} />
      </div>

      <SideBarLinkItem currentUrlPathname={pathname} href={`/${credentialType}/debit-cards`} title="DEBIT CARDS" />

      <SideBarLinkItem currentUrlPathname={pathname} href={`/${credentialType}/credit-cards`} title="CREDIT CARDS" />

      <SideBarLinkItem currentUrlPathname={pathname} href={`/shared`} title="SHARED" />

    </aside>
  )
}

export default MainSideBar

const CredentialsTypeList = ({ credentialType, pathname }: { credentialType: string, pathname: string }) => {

  const items = [
    { title: "Logins", href: `/${credentialType}/credentials/logins` },
    { title: "Websites", href: `/${credentialType}/credentials/websites` },
    { title: "Apps", href: `/${credentialType}/credentials/apps` },
    { title: "Socials", href: `/${credentialType}/credentials/socials` },
  ]
  return <ul className="flex flex-col gap-y-3 pl-3">
    {
      items.map(item => <SideBarLinkItem currentUrlPathname={pathname} key={item.href} href={item.href} title={item.title} />)
    }
  </ul>
}