import { RefObject } from "react"

export type StepFormProps = {
  moveNext? : (email : string) => void
  formRef : RefObject<HTMLFormElement>
}