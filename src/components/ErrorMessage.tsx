type ErrorMessageProps = {
  message : string
}


const ErrorMessage = ({ message } : ErrorMessageProps) => {
  return (
    <div>
      <h3>{message}</h3>
    </div>
  )
}

export default ErrorMessage