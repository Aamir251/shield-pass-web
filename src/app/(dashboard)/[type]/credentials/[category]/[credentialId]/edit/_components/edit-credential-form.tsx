"use client";

import FormInput from "@/components/inputs/default-input";
import PasswordInput from "@/components/inputs/password-input";
import SelectField from "@/components/inputs/select-input";
import TagsDropdown from "@/components/inputs/tags-dropdown";
import { Credential } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { updateCredentialAction } from "../_actions/update-credential-action";
import { showSessionExpiredToastMessage, showSuccessToastMessage } from "@/lib/helpers/toast";



type EditCredentialFormProps = {
  credential: Credential
}

const EditCredentialForm = ({ credential }: EditCredentialFormProps) => {


  let formRef = useRef<HTMLFormElement>(null)

  let timeoutId: NodeJS.Timeout

  const router = useRouter()

  const pathname = usePathname()

  const formAction = async (formData: FormData) => {
    
    const { success, message } = await updateCredentialAction(formData, credential)

    if (!success) {
      if (message === "Session Expired") {
        showSessionExpiredToastMessage()
        clearTimeout(timeoutId)

        timeoutId = setTimeout(() => {
          const currentUrl = window.location.href
          router.push(`/login?callbackUrl=${currentUrl}`)
        })
      }
    } else {
      showSuccessToastMessage("Credential Updated!")
    }
  }


  return (

    <form ref={formRef} action={formAction} className="py-4 mt-5 overflow-y-auto">
      <div className="grid grid-cols-2 gap-x-10 gap-y-8 ">

        <input aria-hidden={true} hidden={true} readOnly name="id" defaultValue={credential.id} />
        <FormInput
          label="Name"
          inputProps={{
            placeholder: "Name",
            name: "name",
            type: "text",
            defaultValue: credential.name
          }}
        />
        <SelectField
          selectProps={{ name: "type" }}
          label=""
          defaultValue={credential.type}
          options={[
            "Personal", "Work", "Business"
          ]}
        />
        <FormInput
          label="Username"
          inputProps={{
            placeholder: "Username",
            name: "username",
            type: "text",
            defaultValue: credential.username
          }}
        />

        <FormInput
          label="Email"
          inputProps={{
            placeholder: "youremail@example.com",
            name: "email",
            type: "email",
            defaultValue: credential.email
          }}
        />

        <PasswordInput
          label="Password"
          defaultValue={credential.password}
        />
        <SelectField
          selectProps={{ name: "category" }}
          defaultValue={credential.category}
          label="Category"
          options={["Logins", "Apps", "Websites", "Socials"]}
        />

        <FormInput
          label="Website URL"
          inputProps={{
            placeholder: "marklibrary.com",
            name: "websiteUrl",
            type: "text",
            defaultValue: credential.websiteUrl
          }}
        />

        <TagsDropdown existingTags={credential.tags} />
      </div>

      <div className="flex justify-center">
        <button type="submit" className="btn-primary px-10 py-2 mt-10 rounded-md">UPDATE</button>
      </div>

    </form>
  )
}

export default EditCredentialForm