import { PropsWithChildren } from "react"
import SearchBar from "../_components/searchbar/page"
import AddNewButton from "../_components/add-new-button"
import { CredentialsType } from "@/types/credentials"

type DashboardLayoutProps = {
  params: {
    type: CredentialsType
  }
}

const Layout = ({ children, params }: PropsWithChildren<DashboardLayoutProps>) => {

  return (
    <div className="w-11/12 mx-auto pt-10">


      <div className="flex items-center">
        <SearchBar />
        <AddNewButton />
      </div>

      <section className="flex gap-x-4">
        {/* <MainSideBar credentialType={params.type} /> */}
        {children}

      </section>
    </div>
  )
}

export default Layout