import { Skeleton } from "@/components/ui/skeleton"
import CredentialsLoader from "./credentials-loader"

const MainSkeletonLoader = () => {
  return (
    <div className="flex gap-x-4 h-dvh">
      <Skeleton className="absolute right-5 lg:right-10 top-5 w-28 h-9" />
      <div className="sidebar hidden lg:block">
        <div className="flex flex-col gap-y-2  pl-1 mt-44">
          {
            Array.from(Array(9).keys()).map(num => <Skeleton key={num} className="h-[40px]" />)
          }
        </div>
      </div>



      <div style={{ height: "calc(100dvh - 180px)" }} className="mt-auto w-full px-5 lg:px-0">

        <CredentialsLoader />
      </div>

    </div>
  )
}

export default MainSkeletonLoader