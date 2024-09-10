"use client";

import RemoveAccessIcon from "@/assets/icons/remove-access.svg"
import Image from "next/image";
import { useFormStatus } from "react-dom";

const RemoveAccessButton = () => {

  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending} aria-disabled={pending}
      className={`cursor-pointer hover:opacity-70 ${pending ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      <Image src={RemoveAccessIcon} alt="remove access" width={18} height={18} />
    </button>
  )
}

export default RemoveAccessButton