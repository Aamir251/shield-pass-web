import CreateCredentialForm from "./_component/create-credential-form"

const NewCredentialPage = () => {
  return (
    <section className="grow border border-primary rounded-md px-8 py-6">

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
  )
}

export default NewCredentialPage