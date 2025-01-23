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
  SmartphoneNfc,
  Text,
  X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";


const MainSideBar = () => {

  const [isOpen, setIsOpen] = useState(false)

  let asideRef = useRef<HTMLElement | null>(null)

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


  useEffect(() => {

    const handleClick = (e : MouseEvent) => {

      if (asideRef.current?.contains(e.target as HTMLElement)) return 
        

      setIsOpen(false)
        
      
    }

    if (isOpen) {
      document.addEventListener("click", handleClick)
    } else {
      document.removeEventListener("click", handleClick)
    }

    return () => {
      document.removeEventListener("click", handleClick)
    }

  },[isOpen])

  const pathname = usePathname()

  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} className="block lg:hidden fixed top-7 left-5 z-20">
        {
          isOpen ? <X size={26} /> : <Text size={25} />
        }
      </div>
      <aside ref={asideRef} className={`sidebar ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 ` } >

        <ul

          className="flex flex-col gap-y-2  pl-1 mt-44"
        >
          {
            items.map(item => <SideBarLinkItem Icon={item.icon} currentPageUrl={pathname} key={item.href} href={item.href} title={item.title} />)
          }
        </ul>

      </aside>

    </>
  )
}

export default MainSideBar

