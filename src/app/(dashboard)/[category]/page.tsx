import { CREDENTIAL_PAGE_CATEGORIES, CredentialCategory, CredentialCategoryPageType } from "@/constants"
import { checkIfSessionExists } from "@/lib/services/auth"
import { getCredentialsByCategoryUseCase, getRecentCredentialsUsecase } from "@/use-cases/credential"
import CategoryCredentialsList from "./_components/category-credentials-list"
import RecentCredentialsList from "./_components/recent-credentials-list"
import SharedCredentialsList from "./_components/shared-credentials-list"
import { CredentialBasic } from "@/types/credentials"


type Props = {
  params: {
    category: CredentialCategoryPageType
  }
}

function checkIfValidCategory(categoryName : string) : categoryName is CredentialCategoryPageType {
  return CREDENTIAL_PAGE_CATEGORIES.includes(categoryName as CredentialCategoryPageType)
}

const CredentialCategoryPage = async ({ params: { category } } : Props) => {
  
  const isCategoryValid = checkIfValidCategory(category)

  if (!isCategoryValid) throw Error ("Oops! you hit the wrong route!")

  const { email } = await checkIfSessionExists()
  
  let credentials : CredentialBasic[];

  if (category === "recents") {
    credentials = await getRecentCredentialsUsecase(email!)

    console.log({ credentials });
    
    return <>
      <RecentCredentialsList credentials={credentials} />
    </>
  }
  
  if (category === "shared") {
    return <>
      <SharedCredentialsList />
    </>
  }

  credentials = await getCredentialsByCategoryUseCase(email!, category)

  return <>
    <CategoryCredentialsList credentials={credentials} />
  </>


}


export default CredentialCategoryPage