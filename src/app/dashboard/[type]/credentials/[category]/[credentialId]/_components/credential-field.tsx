import Image from "next/image";
import CopyCredentialButton from "./copy-credential-button";
import PasswordField from "./password-field";

import ExternalLinkIcon from "@/assets/icons/external-link.svg";
import Link from "next/link";

type CredentialFieldProps = {
  field: string;
  value: string;

  isPassword?: boolean;
  isExternalLink?: boolean;
};

const CredentialField = ({
  field,
  value,
  isPassword = false,
  isExternalLink = false,
}: CredentialFieldProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-2">
      <span className="text-secondary-white w-full">{field}</span>
      <div className="grid grid-cols-[1fr_auto] items-center gap-x-6">
        {isPassword ? (
          <PasswordField value={value} />
        ) : (
          <span className="text-primary-white text-primary-white w-full">
            {value}
          </span>
        )}

        <div className="flex gap-x-6 items-center">
          {isExternalLink && (
            <Link href={value} target="_blank" className="block">
              <Image
                src={ExternalLinkIcon}
                alt="external link"
                width={15}
                height={15}
                className="block"
              />
            </Link>
          )}
          <CopyCredentialButton value={value} />
        </div>
      </div>
    </div>
  );
};

export default CredentialField;
