"use client";

import FormInput from "@/components/inputs/default-input"
import SelectField from "@/components/inputs/select-input"
import TagsDropdown from "@/components/inputs/tags-dropdown"
import { addCredentialAction } from "../_actions/add-credential-action"
import { useRef } from "react"

const CreateCredentialForm = () => {

  let formRef = useRef<HTMLFormElement>(null)

  const formAction = async (formData: FormData) => {

    const resp = await addCredentialAction(formData)

    if (!resp.success) {

      // show a toast
    } else {
      console.log("Credential Added")
      formRef?.current?.reset()
    }
  }

  return (
    <form ref={formRef} action={formAction} className="py-4 mt-5 overflow-y-auto">
      <div className="grid grid-cols-2 gap-x-10 gap-y-8 ">
        <FormInput
          label="Username"
          inputProps={{
            placeholder: "Username",
            name: "username",
            type: "text"
          }}
        />
        <SelectField
          selectProps={{ name: "type", }}
          label=""
          options={[
            { name: "Personal", value: "personal" },
            { name: "Business", value: "business" },
            { name: "Work", value: "work" },
          ]}
        />
        <FormInput
          label="Email"
          inputProps={{
            placeholder: "youremail@example.com",
            name: "email",
            type: "email",
          }}
        />
        <SelectField
          selectProps={{ name: "category" }}
          label="Category"
          options={[
            { name: "Logins", value: "logins" },
            { name: "Websites", value: "websites" },
            { name: "Apps", value: "apps" },
            { name: "Socials", value: "socials" },
          ]}
        />
        <FormInput
          label="Password"
          inputProps={{
            placeholder: "Password",
            name: "password",
            type: "password"
          }}
        />

        <FormInput
          label="PIN"
          inputProps={{
            placeholder: "541684",
            name: "pin",
            type: "text"
          }}
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