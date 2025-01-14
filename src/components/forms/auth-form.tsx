import { Input } from "../ui/input"
import LabelInputWrapper from "./label-input-wrapper"

type FormProps = {
  isSignUpForm?: boolean
}

const Form = ({ isSignUpForm = false }: FormProps) => {

  return <>
    {
      isSignUpForm && <LabelInputWrapper labelTitle="Username">
        <Input placeholder="username" name="username" required />
      </LabelInputWrapper>
    }
    <LabelInputWrapper labelTitle="Email">
      <Input placeholder="email" type="email" name="email" required />
    </LabelInputWrapper>

    <LabelInputWrapper labelTitle="Password">
      <Input placeholder="password" name="password" required type="password" />

    </LabelInputWrapper>

    {
      isSignUpForm && <LabelInputWrapper labelTitle="Confirm Password">
        <Input placeholder="password" name="confirmPassword" required type="password" />

      </LabelInputWrapper>
    }
  </>
}


export default Form