import Image from "next/image";
import NoItemsFoundImage from "@/assets/no-items.png"


const NoCredentialsFound = () => {
  return (

    <article className="flex-center flex-col gap-6 w-full h-auto mt-32 border border-input">
      <h2 className="text-lg text-center ml-14 -translate-x-20">No Items Found</h2>
    </article>
  )
}

export default NoCredentialsFound