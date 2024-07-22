const Form = () => {
  return <>
    <div className="space-y-2.5">
      <h5 className="text-lg">Email</h5>
      <input placeholder="myemail@gmail.com" type="email" name="email" />
    </div>
    <div className="space-y-2.5">
      <h5 className="text-lg">Password</h5>
      <input type="password" name="password" placeholder="*******" />
    </div>
  </>
}


export default Form