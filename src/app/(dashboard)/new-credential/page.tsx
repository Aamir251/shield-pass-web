import type { Metadata } from "next";
import CreateCredentialForm from "./_component/create-credential-form";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";


const NewCredentialPage = () => {

  return (
    <div className="pb-10">

      <div className="max-w-2xl mx-auto px-4 py-5 border rounded-md">
        <h2 className="font-medium text-lg text-center">Add Credential</h2>
        
        <Suspense fallback={<div className="h-44 w-full flex-center">
          <LoadingSpinner />
        </div>} >
          <CreateCredentialForm />
        </Suspense>


      </div>
    </div>
  );
};

export default NewCredentialPage;



export const metadata: Metadata = {
  title: "Create Credential"
}

