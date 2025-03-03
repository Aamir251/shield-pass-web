
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
      isSignUpForm && <>
        <LabelInputWrapper labelTitle="Confirm Password">
          <Input placeholder="password" name="confirmPassword" required type="password" />

        </LabelInputWrapper>
        <LabelInputWrapper labelTitle="What was your First School?">
          <Input placeholder="School Name" name="schoolName" required type="text" />
          <span className="text-xs opacity-50 absolute -bottom-5">This is used for recovering your account</span>
        </LabelInputWrapper>
      </>
    }

  </>
}


export default Form