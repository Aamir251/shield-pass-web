import { getCredentialByIdUseCase } from "@/use-cases/credential";
import CredentialHeading from "./_components/CredentialHeading";
import ActionButtons from "./_components/ActionButtons";
import CredentialField from "./_components/CredentialField";

type SingleCredentialProps = {
  params: {
    credentialId: string;
  };
};

const SingleCredential = async ({
  params: { credentialId },
}: SingleCredentialProps) => {
  const credential = await getCredentialByIdUseCase(credentialId);

  if (!credential)
    return (
      <div>
        <h2>Credential Not Found.</h2>
      </div>
    );

  return (
    <div className="py-4 px-8 bg-[#18181A] text-primary-white flex-grow rounded-md mt-5 ml-4">
      <div className="flex justify-between items-center">
        <CredentialHeading
          email={credential.email}
          name={credential.name}
          websiteUrl={credential.websiteUrl}
        />
        <ActionButtons
          type={credential.type}
          category={credential.category}
          credentialId={credentialId}
        />
      </div>

      <div className="space-y-4 mt-8 w-max">
        <CredentialField field="Username" value={credential.username} />
        <CredentialField field="Email" value={credential.email} />
        <CredentialField
          field="Password"
          isPassword={true}
          value={credential.password}
        />
        <CredentialField isExternalLink={true} field="Website URL" value={credential.websiteUrl} />
      </div>
    </div>
  );
};

export default SingleCredential;
