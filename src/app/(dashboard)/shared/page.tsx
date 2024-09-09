import { checkIfSessionExists } from "@/lib/services/auth"
import { getSharedCredentialsUseCase } from "@/use-cases/credential/credential.share"
import SharedCredentialItem from "./_components/shared-credential-item"

const SharedCredentialPage = async () => {

  const user = await checkIfSessionExists()

  const sharedCredentials = await getSharedCredentialsUseCase(user.email!)

  try {
    const resp = await fetch(`${process.env.NEXTHOME_URL}/api/check-auth`, {
      method: "GET",
      credentials: "include",

    })

    const data = await resp.json()

  } catch (error) {
    console.log({ error })
  }

  return (
    <div className="mt-12 border border-input p-7 grow rounded-md">
      <ul className="flex flex-wrap">
        {
          sharedCredentials.map(credential => <SharedCredentialItem key={credential.id} credential={credential} />)
        }
      </ul>


    </div>
  )
}

export default SharedCredentialPage