import { Skeleton } from "../ui/skeleton"

const CredentialsLoader = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-x-3 gap-y-4 lg:max-w-[97%]">
    {
      Array.from(Array(3).keys()).map(num => <Skeleton key={num} className="h-[166px] w-full" />)
    }
  </div>
  )
}

export default CredentialsLoader