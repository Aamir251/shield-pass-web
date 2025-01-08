import { CredentialsType } from "@/types/credentials"
import SearchBar from "../_components/searchbar"
import { PropsWithChildren } from "react"

type SharedCredentialsLayouttProps = {
  params: {
    type: CredentialsType
  }
}

const SharedCredentialsLayout = async ({ children, params }: PropsWithChildren<SharedCredentialsLayouttProps>) => {

  
  return (
    <div className="w-11/12 mx-auto pt-10">
      <div className="flex-center">
        <SearchBar isSharedCredentialPage={true} credentialType={params.type} />
      </div>
      
      <section style={{ maxHeight: "calc(100vh - 245px)" }} className="flex gap-x-4 h-full">
        {children}

      </section>
    </div>
  )
}

export default SharedCredentialsLayout