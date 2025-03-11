import Image from 'next/image'
import React, { PropsWithChildren } from 'react'
import LoginImage from "@/assets/login-image.jpg";

const AuthLayout = ({ children } : PropsWithChildren) => {
  return (
    <section className="h-screen w-full grid lg:grid-cols-2">

      <div className="hidden lg:block h-full w-full">
        <figure className="relative h-full w-full -z-10">
          <Image src={LoginImage} alt="" fill objectFit="cover" />
        </figure>
      </div>
      <div className="h-full relative text-white lg:pl-[15%] px-6 lg:px-0">
        {children}
      </div>
    </section>
  )
}

export default AuthLayout