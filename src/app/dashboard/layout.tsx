import { PropsWithChildren } from "react"
import TopNav from "./_components/top-nav"
import SearchBar from "./_components/searchbar/page"
import AddNewButton from "./_components/add-new-button"
import { CredentialsType } from "@/types/credentials"
import MainSideBar from "./_components/main-side-bar"



type DashboardLayoutProps = {
  params: {
    type: CredentialsType
  }
}



const DashboardLayout = ({ children, params }: PropsWithChildren<DashboardLayoutProps>) => {

  return (
    <main className="w-11/12 mx-auto pt-10">

      <TopNav />
      <div className="flex items-center">
        <SearchBar />
        <AddNewButton />
      </div>

      <section className="flex gap-x-4">
        <MainSideBar pageType={params.type} />
        {children}

      </section>
    </main>
  )
}

export default DashboardLayout