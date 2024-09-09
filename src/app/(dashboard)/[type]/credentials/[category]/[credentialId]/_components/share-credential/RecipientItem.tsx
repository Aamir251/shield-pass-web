
type RecipientItemProps = {
  userId: string // Id of the recipient
  email: string // Email address of the Recipient
}

const RecipientItem = ({ userId, email }: RecipientItemProps) => {


  return (
    <form className="px-3 py-2 text-sm bg-black-one text-secondary-white rounded-md block">
      <input aria-hidden={true} hidden={true} defaultValue={userId} readOnly={true} aria-readonly={true} />


    </form>
  )
}

export default RecipientItem