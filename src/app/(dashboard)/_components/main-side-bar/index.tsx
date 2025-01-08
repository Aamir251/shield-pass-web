"use client";

import { usePathname } from "next/navigation";
import SideBarLinkItem from "./sidebar-link-item"
import { 
  CloudCog,
  EarthLock,
  Landmark, Mails,
  MessageSquareLock,
  Share2,
  Shield,
  ShoppingCart,
  SmartphoneNfc 
} from "lucide-react";


const MainSideBar = () => {

  const items = [
    { title: "Recents", href: `/recents`, icon: Shield },
    { title: "Websites", href: `/websites`, icon: EarthLock },
    { title: "Applications", href: `/applications`, icon: SmartphoneNfc },
    { title: "Email Accounts", href: `/emails`, icon: Mails },
    { title: "Social Media", href: `/socials`, icon: MessageSquareLock },
    { title: "Cloud Storage", href: `/cloud`, icon: CloudCog },
    { title: "Finance", href: `/finance`, icon: Landmark },
    { title: "Ecommerce", href: `/ecommerce`, icon: ShoppingCart },
    { title: "Shared", href: `/shared`, icon: Share2 },
  ]



  const pathname = usePathname()

  return (
    <aside className="sidebar-border w-72 px-2">

      <ul 
        
        className="flex flex-col gap-y-2  pl-1 mt-44"
      >
        {
          items.map(item => <SideBarLinkItem Icon={item.icon} currentPageUrl={pathname} key={item.href} href={item.href} title={item.title} />)
        }
      </ul>

    </aside>
  )
}

export default MainSideBar

