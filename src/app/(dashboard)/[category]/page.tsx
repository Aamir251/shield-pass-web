import { CREDENTIAL_PAGE_CATEGORIES, CredentialCategory, CredentialCategoryPageType, CredentialSharedWithMe } from "@/constants"
import { checkIfSessionExists } from "@/lib/services/auth"
import { getCredentialsByCategoryUseCase, getRecentCredentialsUsecase } from "@/use-cases/credential"
import CategoryCredentialsList from "./_components/category-credentials-list"
import RecentCredentialsList from "./_components/recent-credentials-list"
import SharedCredentialsList from "./_components/shared-credentials-list"
import { CredentialBasic } from "@/types/credentials"
import { getSharedCredentialsUseCase } from "@/use-cases/credential/credential.share"
import { PropsWithChildren } from "react"
import { Metadata } from "next"


type Props = {
  params: {
    category: CredentialCategoryPageType
  }
}

const checkIfValidCategory = (categoryName: string): categoryName is CredentialCategoryPageType => {
  return CREDENTIAL_PAGE_CATEGORIES.includes(categoryName as CredentialCategoryPageType)
}

const CredentialCategoryPage = async ({ params: { category } }: Props) => {

  const isCategoryValid = checkIfValidCategory(category)

  if (!isCategoryValid) throw Error("Oops! you hit the wrong route!")

  const { email } = await checkIfSessionExists()

  let credentials: CredentialBasic[];

  if (category === "recents") {
    credentials = await getRecentCredentialsUsecase(email!)


    return <CredentialsListWrapper>
      <RecentCredentialsList credentials={credentials} />
    </CredentialsListWrapper>
  }

  if (category === "shared") {
    const { credentials: sharedCredentials } = await getSharedCredentialsUseCase(email!)
    return <CredentialsListWrapper>
      <SharedCredentialsList credentials={sharedCredentials} />
    </CredentialsListWrapper>
  }

  credentials = await getCredentialsByCategoryUseCase(email!, category)

  return <CredentialsListWrapper>
    <CategoryCredentialsList credentials={credentials} />
  </CredentialsListWrapper>


}


export default CredentialCategoryPage


const CredentialsListWrapper = ({ children }: PropsWithChildren) => {

  return (
    <div className="grid lg:grid-cols-3 gap-y-6 gap-x-3">
      {children}
    </div>
  )
}




type MetaDataProps = {
  params: Promise<{ category: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: MetaDataProps): Promise<Metadata> {
  const category = (await params).category;


  const title = category.charAt(0).toUpperCase() + category.slice(1) + " Credentials"

  return {
    title
  }
}
