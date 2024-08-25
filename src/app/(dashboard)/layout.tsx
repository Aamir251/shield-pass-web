import { PropsWithChildren } from "react"
import TopNav from "./_components/top-nav"
import MainSideBar from "./_components/main-side-bar"

const DashboardLayout = ({ children }: PropsWithChildren) => {


  return <main className="pt-10 flex flex-col min-h-dvh w-11/12 mx-auto pt-10">
    <TopNav />
    <section className="flex gap-x-4">

      <MainSideBar />
      {children}

    </section>
  </main>
}


export default DashboardLayout