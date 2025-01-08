import Link from "next/link"
import EditIcon from "@/assets/icons/edit-icon.svg"

import Image from "next/image";
import DeleteCredential from "./delete-credential";

type ActionButtonsProps = {
  category: string;
  credentialId: string;
}
const ActionButtons = ({ category, credentialId }: ActionButtonsProps) => {
  return <div className="flex gap-x-8 items-center">

    <Link
      className="text-primary-blue text-sm flex gap-x-2 items-center border border-primary-blue rounded-sm px-4 py-1.5 font-medium hover:opacity-70"
      href={`/${category.toLowerCase()}/${credentialId}/edit`}
    >
      <span>Edit</span>
      <Image src={EditIcon} alt="Edit" width={14} height={14} />
    </Link>

    <DeleteCredential credentialId={credentialId} />

  </div>
}

export default ActionButtons