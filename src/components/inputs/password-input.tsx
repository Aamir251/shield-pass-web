"use client";

import { InputHTMLAttributes, useState } from "react";

import EyeOpenIcon from "@/assets/icons/eye-open.svg"
import EyeClosedIcon from "@/assets/icons/eye-close.svg"
import Image from "next/image";


type FormInputProps = {
  label: string
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  defaultValue?: string
}


const PasswordInput = ({ inputProps, label, defaultValue }: FormInputProps) => {

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const imageProps = { width: 16, height: 16 };


  return (
    <div className="space-y-2.5 relative">
      <h5>{label}</h5>
      <input name="password" defaultValue={defaultValue} type={showPassword ? "text" : "password"} className="border border-input" {...inputProps} />


      <button type="button" className="cursor-pointer absolute right-4 top-10">
        {showPassword ? (
          <Image src={EyeOpenIcon} alt="show password" {...imageProps} onClick={() => setShowPassword(false)} />
        ) : (
          <Image src={EyeClosedIcon} alt="hide password" {...imageProps} onClick={() => setShowPassword(true)} />
        )}
      </button>
    </div>
  )
}

export default PasswordInput