"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import { EllipsisVertical } from "lucide-react";
import { CredentialBasic } from "@/types/credentials";
import { useCredentialActionContext } from "@/providers/credential-actions-context";
import { useRouter } from "next/navigation";

type ShowMoreActionsButtonProps = {
  credential: CredentialBasic
}


const ShowMoreActionsButton = ({ credential }: ShowMoreActionsButtonProps) => {
  
  const { setSelectedCredential } = useCredentialActionContext()

  const setCredentialCallback = setSelectedCredential.bind(null, credential)
  
  return (
    <Popover>
      <PopoverTrigger className="absolute top-5 right-5">
        <EllipsisVertical />
      </PopoverTrigger>
      <PopoverContent className="px-1 py-2">

        <ul className="text-sm">
          <ActionButton setCredentialCallback={setCredentialCallback}  title="Edit" query={`edit`} />

          <ActionButton setCredentialCallback={setCredentialCallback} title="Delete" query={`delete`} />

          <ActionButton setCredentialCallback={setCredentialCallback} title="Share/Remove Access" query={`share`} />
        </ul>
      </PopoverContent>
    </Popover>
  )
}

export default ShowMoreActionsButton

type ActionButtonProps = {
  title: string
  setCredentialCallback: () => void,
  query : string
}

const ActionButton = ({ title, query, setCredentialCallback }: ActionButtonProps) => {
  const router = useRouter()

  const handleClick = () => {
    setCredentialCallback()
    router.replace(`?${query}`, {
      scroll : false
    })
  }
  return <li
    onClick={handleClick}
    className="py-1.5 block px-4 hover:bg-primary-foreground rounded-sm cursor-pointer">
    {title}
  </li>
}