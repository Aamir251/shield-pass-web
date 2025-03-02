type ErrorMessageProps = {
  message : string
  className? : string
}


const ErrorMessage = ({ message, className } : ErrorMessageProps) => {
  return (
    <div className={`${className}`}>
      <h3>{message}</h3>
    </div>
  )
}

export default ErrorMessage