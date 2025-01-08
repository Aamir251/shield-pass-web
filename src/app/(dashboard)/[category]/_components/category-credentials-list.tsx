/**
 * Credentials List of the particular Category
*/

import CredentialItem from "@/components/credential-item";
import ErrorMessage from "@/components/ErrorMessage";
import { CredentialBasic } from "@/types/credentials";

type CredentialsListProps = {
  credentials : CredentialBasic[]
}

const CategoryCredentialsList = async ({ credentials } : CredentialsListProps ) => {

  if (!credentials.length) {
    return <ErrorMessage message="No Credentials Found" /> 
  }
  
  return (
    credentials.map(credential => <CredentialItem key={credential.id} credential={credential} />)
  )
}

export default CategoryCredentialsList