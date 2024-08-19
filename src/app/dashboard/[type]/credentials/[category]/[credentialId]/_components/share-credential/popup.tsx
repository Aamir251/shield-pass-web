import { showSuccessToastMessage, showToastErrorMessage } from "@/lib/helpers/toast"
import { shareCredentialAction } from "../../_actions/share-credential-action"
import BasicSpinnerLoader from "@/components/loaders/basic-spinner"
import Recipients from "./recipients"
import { KeyedMutator } from "swr"


type ShareCredentialPopupProps = {
  closePopup: () => void
  credentialId: string
  recipientsData: {
    recipients: Receipent[]
    success: boolean
  }

  mutate: KeyedMutator<any>
}

export type Receipent = {
  email: string
}

type CredentialRecipientsResponse = {
  success: true
  recipients: Receipent[]
} | {
  success: false
  message: string
}

const ShareCredentialPopup = ({ closePopup, credentialId, recipientsData, mutate }: ShareCredentialPopupProps) => {

  const isLoading = !recipientsData; // if this is undefined, it means recipients have not been loaded

  console.log({ recipientsData })

  const formAction = async (formData: FormData) => {
    const action = shareCredentialAction.bind(null, credentialId)
    const resp = await action(formData)

    if (!resp.success) {
      // failed
      showToastErrorMessage(resp.message)
    } else {
      // success
      showSuccessToastMessage("Credential Shared")
      const existingRecipients = recipientsData?.recipients ?? []
      mutate({ ...recipientsData, recipients: [...existingRecipients, formData.get("email")] })
    }
  }



  return (
    <section className="fixed top-0 left-0 h-screen w-screen bg-black/70 flex-center">
      <div className="bg-primary-dark w-full max-w-2xl px-10 py-14 rounded-lg space-y-3 relative min-h-56">
        {/* close icon */}
        <svg onClick={closePopup} className="absolute top-3 right-3 cursor-pointer hover:opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#e5e5e5"} fill={"none"}>
          <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {
          isLoading ? <BasicSpinnerLoader className="w-full h-44 flex-center" /> : <>
            <h3 className="text-xl">Share With</h3>
            <form action={formAction}>
              <input type="email" name="email" placeholder="Email of Receipent" className="border border-input" />
              <button className="btn-primary px-6 py-1.5 rounded-sm mt-3">Share 🚀</button>
            </form>
          </>
        }

        {
          recipientsData && recipientsData.recipients.length > 0 && <Recipients recipients={recipientsData.recipients} />
        }
      </div>
    </section>
  )
}

export default ShareCredentialPopup