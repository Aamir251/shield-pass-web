import PasswordInput from "../inputs/password-input"

type FormProps = {
  isSignUpForm?: boolean
}

const Form = ({ isSignUpForm = false }: FormProps) => {

  return <>
    {
      isSignUpForm && <div className="space-y-2.5">
        <h5 className="text-lg">Username</h5>
        <input placeholder="Robert Smith" type="text" name="username" />

      </div>
    }
    <div className="space-y-2.5">
      <h5 className="text-lg">Email</h5>
      <input placeholder="robert@gmail.com" type="email" name="email" />
    </div>
    <PasswordInput label="Password" inputProps={{ name: "password", placeholder : "Password"}} />

    {
      isSignUpForm && <PasswordInput 
        label="Confirm Password" 
        inputProps={{ name : "confirmPassword", placeholder : "Confirm Password"}} 
      />
    }
  </>
}


export default Form