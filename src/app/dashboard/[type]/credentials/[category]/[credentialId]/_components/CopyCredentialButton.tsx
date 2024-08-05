"use client";

import CopyIcon from "@/assets/icons/copy.svg";
import Image from "next/image";
import toast from "react-hot-toast";

const CopyCredentialButton = ({ value }: { value: string }) => {
  const onClick = async () => {
    await navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard", {
      duration: 2000,
      ariaProps: {
        role: "status",
        "aria-live": "assertive",
      },
      iconTheme: {
        primary: "#141415",
        secondary: "#C3C1C1",
      },
    });
  };
  return (
    <button className="h-max w-max cursor-pointer" onClick={onClick}>
      <Image src={CopyIcon} alt="copy" width={15} height={15} />
    </button>
  );
};

export default CopyCredentialButton;
