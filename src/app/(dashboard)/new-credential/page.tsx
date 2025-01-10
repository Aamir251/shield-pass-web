import CreateCredentialForm from "./_component/create-credential-form";


const NewCredentialPage = () => {

  return (
    <div>

      <div className="max-w-2xl mx-auto px-3 py-5 border rounded-md">
        <h2 className="font-medium text-lg text-center">Add Credential</h2>

       <CreateCredentialForm />
      </div>
    </div>
  );
};

export default NewCredentialPage;



