"use client";

import FormInput from "@/components/inputs/default-input"
import SelectField from "@/components/inputs/select-input"
import TagsDropdown from "@/components/inputs/tags-dropdown"
import { addCredentialAction } from "../_actions/add-credential-action"
import { useRef } from "react"
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

const CreateCredentialForm = () => {

  let formRef = useRef<HTMLFormElement>(null)

  let timeoutId: NodeJS.Timeout

  const router = useRouter()

  const pathname = usePathname()

  const formAction = async (formData: FormData) => {

    const resp = await addCredentialAction(formData)


    if (!resp.success) {

      if (resp.message === "Session Expired") {
        // session expired Please Log In Again
        toast.error("Session Expired! Redirecting to Login Page...", {
          duration: 4000,
          ariaProps: {
            role: "status",
            "aria-live": "assertive"
          },
          iconTheme: {
            primary: "#141415",
            secondary: "#C3C1C1"
          }
        })

        clearTimeout(timeoutId)

        timeoutId = setTimeout(() => {
          const currentUrl = window.location.href
          router.push(`/login?callbackUrl=${currentUrl}`)
        })


      }

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
          label="Name"
          inputProps={{
            placeholder: "Name",
            name: "name",
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
          options={[
            { name: "Logins", value: "logins" },
            { name: "Websites", value: "websites" },
            { name: "Apps", value: "apps" },
            { name: "Socials", value: "socials" },
          ]}
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