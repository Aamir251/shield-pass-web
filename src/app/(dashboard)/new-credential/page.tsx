import CreateCredentialForm from "./_component/create-credential-form";

const NewCredentialPage = () => {
  return (
    <div className="grow">
      <section className="border border-primary rounded-md px-8 py-6 mt-10 w-10/12 mx-auto max-w-4xl">
        <div>
          <h2 className="text-primary-blue flex gap-x-4 items-center font-medium">
            <span className="block h-8 rounded-full w-1 bg-primary-blue"></span>
            <span>ADD NEW CREDENTIAL</span>
          </h2>
        </div>
        <div>
          <CreateCredentialForm />
        </div>
      </section>
    </div>
  );
};

export default NewCredentialPage;
