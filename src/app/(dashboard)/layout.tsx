import { PropsWithChildren } from "react"
import TopNav from "./_components/top-nav"
import MainSideBar from "./_components/main-side-bar"
import EncryptionKeyContextProvider from "@/providers/encryption-key"

const DashboardLayout = ({ children }: PropsWithChildren<{ params: any }>) => {


  return <EncryptionKeyContextProvider>
    <main className="h-dvh mx-auto">
      <TopNav />
      <section className="flex gap-x-4 h-dvh">

        <MainSideBar />

        <div style={{ height: "calc(100dvh - 180px)" }} className="mt-auto w-full">
          {children}
        </div>
        
      </section>
    </main>
  
  </EncryptionKeyContextProvider>
}


export default DashboardLayout