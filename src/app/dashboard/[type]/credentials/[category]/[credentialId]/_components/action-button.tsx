import Link from "next/link"
import EditIcon from "@/assets/icons/edit-icon.svg"

import Image from "next/image";
import DeleteCredential from "./DeleteCredential";

type ActionButtonsProps = {
    type: string;
    category: string;
    credentialId: string;
}
const ActionButtons = ({type, category, credentialId}: ActionButtonsProps) => {
  return <div className="flex gap-x-8 items-center">

    <Link 
      className="text-primary-blue flex gap-x-2 items-center border border-primary-blue rounded-sm px-6 py-2 font-medium" 
      href={`/dashboard/${type.toLowerCase()}/credentials/${category.toLowerCase()}/${credentialId}/edit`}
    >
        <span>Edit</span>
        <Image src={EditIcon} alt="Edit" width={16} height={16} />
    </Link>

    <DeleteCredential />

  </div>
}

export default ActionButtons