import Link from "next/link";

const AddNewButton = () => {
  return (
    <Link
      href={"/new-credential"}
      className="btn-primary px-8 py-2 rounded-sm ml-auto"
    >
      Add
    </Link>
  );
};

export default AddNewButton;
