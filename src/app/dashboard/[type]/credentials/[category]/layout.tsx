import { getAllCredentialUseCase } from "@/use-cases/credential"
import { getServerSession } from "next-auth"
import CredentialItem from "../../_components/CredentialItem"
import { PropsWithChildren } from "react"

type CredentialsPageProps = PropsWithChildren<{
  params: {
    category: string
  }
}>


const CredentialsLayout = async ({ params: { category }, children }: CredentialsPageProps) => {

  const availableCategories = ["logins", "websites", "socials", "apps"]

  if (!availableCategories.includes(category)) throw new Error("Oops! You hit the wrong Route")


  const session = await getServerSession()

  const credentials = await getAllCredentialUseCase(session?.user?.email!)

  return (
    <>
      <section className="py-8">
        {
          credentials.map(credential => <CredentialItem key={credential.id} credential={credential} />)
        }
      </section>
      {children}
    </>
  )
}

export default CredentialsLayout