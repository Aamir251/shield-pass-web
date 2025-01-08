import { CredentialsType } from "@/types/credentials";
import Link from "next/link";

type AddNewButtonProps = {
  credentialsType : CredentialsType
}

const AddNewButton = ({ credentialsType } : AddNewButtonProps) => {
  return (
    <Link
      href={`/${credentialsType}/new-credential`}
      className="btn-primary px-8 py-2 rounded-sm ml-auto"
    >
      Add
    </Link>
  );
};

export default AddNewButton;
