"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import { EllipsisVertical } from "lucide-react";
import { DialogTrigger } from "../ui/dialog";
import CredentialActionContextProvider from "@/providers/credential-actions-context";

type ShowMoreActionsButtonProps = {

}


const ShowMoreActionsButton = ({ }: ShowMoreActionsButtonProps) => {

  return (
    <CredentialActionContextProvider>
    <Popover>
      <PopoverTrigger className="absolute top-5 right-5">
        <EllipsisVertical />
      </PopoverTrigger>
      <PopoverContent className="px-1 py-2">

        <ul className="text-sm">
          <DialogTrigger className="w-full text-left">
            <ActionButton title="Edit" />
          </DialogTrigger>
          <ActionButton title="Delete" />
          <ActionButton title="Share/Remove Access" />
        </ul>
      </PopoverContent>
    </Popover>
    </CredentialActionContextProvider>
  )
}

export default ShowMoreActionsButton

type ActionButtonProps = {
  title: string
  onClick?: () => void
}

const ActionButton = ({ title }: ActionButtonProps) => {
  return <li className="py-1.5 px-4 hover:bg-primary-foreground rounded-sm cursor-pointer">{title}</li>
}