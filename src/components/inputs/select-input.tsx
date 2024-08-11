"use client";

import Image from "next/image";
import { SelectHTMLAttributes, useEffect, useState } from "react"
import DropdownArrow from "@/assets/dropdown-arrow.svg";
import { CredentialsType } from "@/types/credentials";

type SelectFieldProps = {
  label: string
  selectProps: SelectHTMLAttributes<HTMLSelectElement>
  options: string[]
  defaultValue?: string
}


type OptionField = string

const SelectField = ({ label, selectProps, options, defaultValue }: SelectFieldProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  const [selected, setSelected] = useState<OptionField>(defaultValue || options[0])


  const handleDropdownClick = (selectedOption: string) => {
    setSelected(selectedOption)
    setShowDropdown(false)
  }

  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      setShowDropdown(false)
    }
    if (showDropdown) {
      document.addEventListener("click", handleDocClick)
    }

    return () => document.removeEventListener("click", handleDocClick)
  }, [showDropdown])


  return (
    <div className="relative">
      <label className="block h-9">{label}</label>
      <div className="hidden">
        <input aria-hidden hidden value={selected} readOnly={true} aria-readonly={true} name={selectProps.name} />
      </div>

      <div onClick={() => setShowDropdown(true)} className="border border-input bg-black-one px-5 py-2.5 rounded-md flex justify-between">
        <span>{selected}</span>
        <Image src={DropdownArrow} width={12} height={12} alt="dropdown arrow" />
      </div>
      {showDropdown && <ul className="absolute top-22 left-0 z-10 bg-black-one w-full border border-primary rounded-md">
        {
          options.map(option => <li
            key={option}
            className="py-1.5 hover:bg-primary-dark px-3 cursor-pointer"
            onClick={() => handleDropdownClick(option)}>
            {option}
          </li>)
        }
      </ul>}
    </div>
  )
}

export default SelectField