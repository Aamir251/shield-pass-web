"use client";

import FormInput from "@/components/inputs/default-input"
import SelectField from "@/components/inputs/select-input"
import TagsDropdown from "@/components/inputs/tags-dropdown"
import { addCredentialAction } from "../_actions/add-credential-action"
import { useRef } from "react"
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { showSessionExpiredToastMessage, showSuccessToastMessage } from "@/lib/helpers/toast";

const CreateCredentialForm = () => {

  let formRef = useRef<HTMLFormElement>(null)

  let timeoutId: NodeJS.Timeout

  const router = useRouter()

  const pathname = usePathname()

  const formAction = async (formData: FormData) => {

    const resp = await addCredentialAction(formData)


    if (!resp.success) {
      // Failure
      if (resp.message === "Session Expired") {

        showSessionExpiredToastMessage()

        clearTimeout(timeoutId)

        timeoutId = setTimeout(() => {
          const currentUrl = window.location.href
          router.push(`/login?callbackUrl=${currentUrl}`)
        })


      }

      // show a toast
    } else {
      // Success

      showSuccessToastMessage("Credential Added!")
      formRef?.current?.reset()
    }
  }

  return (
    <form ref={formRef} action={formAction} className="py-4 mt-5 overflow-y-auto">
      <div className="grid grid-cols-2 gap-x-10 gap-y-8 ">
        <FormInput
          label="Name"
          inputProps={{
            placeholder: "Name",
            name: "name",
            type: "text"
          }}
        />
        <SelectField
          selectProps={{ name: "type" }}
          label=""
          options={[
            "Personal", "Work", "Business"
          ]}
        />
        <FormInput
          label="Username"
          inputProps={{
            placeholder: "Username",
            name: "username",
            type: "text"
          }}
        />

        <FormInput
          label="Email"
          inputProps={{
            placeholder: "youremail@example.com",
            name: "email",
            type: "email",
          }}
        />

        <FormInput
          label="Password"
          inputProps={{
            placeholder: "Password",
            name: "password",
            type: "password"
          }}
        />
        <SelectField
          selectProps={{ name: "category" }}
          label="Category"
          options={["Logins", "Apps", "Websites", "Socials"]}
        />
        <FormInput
          label="Website URL"
          inputProps={{
            placeholder: "marklibrary.com",
            name: "websiteUrl",
            type: "text"
          }}
        />

        <TagsDropdown />
      </div>

      <div className="flex justify-center">
        <button className="btn-primary px-10 py-2 mt-10 rounded-md">SUBMIT</button>
      </div>

    </form>
  )
}

export default CreateCredentialForm