import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react"


type FormInputProps = {
  label: string
  inputProps: InputHTMLAttributes<HTMLInputElement>
}

const FormInput = ({ inputProps, label }: FormInputProps) => {
  return (
    <div className="space-y-2.5">
      <label>{label}</label>
      <input className="border border-input" {...inputProps} />
    </div>
  )
}

export default FormInput