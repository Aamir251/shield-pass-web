import { checkIfSessionExists } from "@/lib/services/auth"
import { getRecentCredentialsUsecase } from "@/use-cases/credential"
import CredentialItemBlock from "./_components/CredentialItemBlock"

const PrivateCredentialsPage = async () => {

  const session = await checkIfSessionExists()

  if (!session) throw new Error("Session Expired")

  const recentCredentials = await getRecentCredentialsUsecase(session.email!)

  return (
    <ul className="py-8 border border-input px-5 grow mt-5 rounded-md flex">
      {
        recentCredentials.map(credential => <CredentialItemBlock key={credential.id} credential={credential} />)
      }
    </ul>
  )
}

export default PrivateCredentialsPage