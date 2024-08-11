import { PropsWithChildren } from "react"
import TopNav from "./_components/top-nav"

const DashboardLayout = ({ children } : PropsWithChildren) => {
  return <main className="pt-10 flex flex-col min-h-dvh">
     <TopNav />
     {children}
  </main>
}


export default DashboardLayout