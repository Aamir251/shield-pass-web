import { PropsWithChildren } from "react"
import { Label } from "../ui/label"

type LabelInputWrapperProps = PropsWithChildren<{
  labelTitle: string
}>

const LabelInputWrapper = ({ children, labelTitle }: LabelInputWrapperProps) => {
  return <div className="flex flex-col gap-y-3 items-left relative">
    <Label className="">
      {labelTitle}
    </Label>
    {children}
  </div>
}

export default LabelInputWrapper