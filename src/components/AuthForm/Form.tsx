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
    <div className="space-y-2.5">
      <h5 className="text-lg">Password</h5>
      <input type="password" name="password" placeholder="*******" />
    </div>

    {
      isSignUpForm && <div className="space-y-2.5">
        <h5 className="text-lg">Confirm Password</h5>
        <input placeholder="confirm password" type="text" name="confirmPassword" />
      </div>
    }
  </>
}


export default Form