"use client";

import DeleteIcon from "@/assets/icons/delete.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { deleteCredentialAction } from "../_actions/delete-credential-action";
import { showSessionExpiredToastMessage, showSuccessToastMessage, showToastErrorMessage } from "@/lib/helpers/toast";

const DeleteCredential = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = setShowModal.bind(null, false);


  return (
    <>
      <Image onClick={setShowModal.bind(null, true)} src={DeleteIcon} alt="Delete" width={20} height={20} />
      {showModal && <DeleteModal hideModal={closeModal} />}
    </>
  );
};

export default DeleteCredential;


type DeleteModalProps = {
  hideModal: () => void
}

const DeleteModal = ({ hideModal }: DeleteModalProps) => {

  const pathname = usePathname()
  const router = useRouter()



  const arr = pathname.split("/")
  const credentialId = arr[arr.length - 1]


  arr.pop()
  const redirectionUrl = arr.join("/");

  let timeoutId: NodeJS.Timeout

  const formAction = async (formData: FormData) => {
    const resp = await deleteCredentialAction(formData, redirectionUrl)

    if (!resp.success) {
      if (resp.message === "Session Expired") {

        showSessionExpiredToastMessage()

        clearTimeout(timeoutId)

        timeoutId = setTimeout(() => {
          const currentUrl = window.location.href
          router.push(`/login?callbackUrl=${currentUrl}`)
        })
      } else {
        showToastErrorMessage(resp.message)
      }

    } else {
      showSuccessToastMessage("Credential Deleted")




      router.replace(`${redirectionUrl}`)
    }

  }


  return (
    <div
      className="fixed h-screen w-screen inset-0 bg-black/70 z-50 flex justify-center items-start"
      role="alert"
    >
      <form action={formAction} className="relative p-10 pr-14 bg-secondary-dark rounded-md translate-y-7">
        <input type="text" aria-hidden={true} hidden={true} name="credentialId" defaultValue={credentialId} readOnly />
        <svg onClick={hideModal} className="absolute top-3 right-3 cursor-pointer hover:opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#e5e5e5"} fill={"none"}>
          <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="flex items-center gap-4">
          <p className="sm:text-lg">
            Are you Sure you want to Delete Credential
          </p>
        </div>

        <div className="mt-6 sm:flex sm:gap-4 justify-center items-center">
          <button className="bg-primary-blue px-5 py-2 rounded-sm text-black hover:opacity-80">Yes</button>

          <button onClick={hideModal} className="border border-input px-5 py-1.5 rounded-sm hover:opacity-80">
            No
          </button>
        </div>
      </form>
    </div>
  );
}
