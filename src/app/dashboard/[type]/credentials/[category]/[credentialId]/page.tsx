import { getCredentialByIdUseCase } from "@/use-cases/credential"
import CredentialHeading from "./_components/CredentialHeading"

type SingleCredentialProps = {
  params: {
    credentialId: string
  }
}


const SingleCredential = async ({ params: { credentialId } }: SingleCredentialProps) => {

  const credential = await getCredentialByIdUseCase(credentialId)

  if (!credential)
    return (
      <div>
        <h2>Credential Not Found.</h2>
      </div>
    )


  return (
    <div className="py-4 px-8 bg-secondary-dark text-primary-white flex-grow rounded-md mt-5">

      <CredentialHeading email={credential.email} name={credential.name} websiteUrl={credential.websiteUrl} />
    </div>
  )
}

export default SingleCredential