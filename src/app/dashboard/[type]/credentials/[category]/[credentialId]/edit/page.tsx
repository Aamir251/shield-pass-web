import { CREDENTIAL_CATEGORIES, CREDENTIAL_TYPES } from "@/constants"
import EditCredentialForm from "./_components/edit-credential-form"
import { getCredentialByIdUseCase } from "@/use-cases/credential"
import { getServerSession } from "next-auth"

type Props = {
  params: {
    type: string
    category: string
    credentialId: string
  }
}

const EditCredentialPage = async ({ params: { type, category, credentialId } }: Props) => {

  // verify type and category

  if (!type || !category || !credentialId) throw new Error("Something Went Wrong!")

  if (!CREDENTIAL_TYPES.includes(type) || !CREDENTIAL_CATEGORIES.includes(category)) throw new Error("Invalid credential type")


  const session = await getServerSession()
  if (!session?.user?.email) throw new Error("Session Expired")


  const credential = await getCredentialByIdUseCase(credentialId, session.user.email)

  if (!credential) throw new Error("Credential Not Found")


  console.log({ credential })

  return (
    <section className="grow border border-primary rounded-md px-8 py-6">

      <div>

        <h2 className="text-primary-blue flex gap-x-4 items-center font-medium">
          <span className="block h-8 rounded-full w-1 bg-primary-blue"></span>
          <span>EDIT CREDENTIAL</span>
        </h2>
      </div>
      <div>
        <EditCredentialForm credential={credential} />
      </div>
    </section>
  )
}

export default EditCredentialPage