"use client";

import { usePathname } from "next/navigation";

type Props = {

  credentialId: string
};

const CredentialItemBackground = ({ credentialId }: Props) => {

  const pathname = usePathname();

  if (pathname.includes(credentialId)) {
    return (
      <div className="bg-black-one rounded-md absolute top-0 left-0 w-full h-full -z-10"></div>
    );
  }

  return null;

};

export default CredentialItemBackground;
