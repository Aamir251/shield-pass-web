"use client";

import { useState } from "react";

import EyeOpenIcon from "@/assets/icons/eye-open.svg";
import EyeClosedIcon from "@/assets/icons/eye-close.svg";
import Image from "next/image";

const PasswordField = ({ value }: { value: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageProps = { width: 20, height: 20 };

  return (
    <div className="w-full flex gap-x-7 items-center">
      <input
        className="px-0 bg-transparent"
        readOnly
        type={isVisible ? "text" : "password"}
        value={value}
      />

      <button className="cursor-pointer">
      {isVisible ? (
        <Image src={EyeOpenIcon} alt="show password" {...imageProps} onClick={() => setIsVisible(false)} />
      ) : (
        <Image src={EyeClosedIcon} alt="hide password" {...imageProps} onClick={() => setIsVisible(true)} />
      )}
      </button>
    </div>
  );
};

export default PasswordField;
