import Image from "next/image"
import LoginImage from "@/assets/login-image.jpg";
import SignUpForm from "./_components/signup-form";


const SignUpPage = () => {
  return (
    <section className="h-screen w-full grid grid-cols-2">

      <div className="h-full w-full">
        <figure className="relative h-full w-full -z-10">
          <Image src={LoginImage} alt="" fill objectFit="cover" />
        </figure>
      </div>
      <div className="h-full relative text-white pl-[15%]">

        <div className="relative z-10 flex flex-col justify-center h-full space-y-10 max-w-sm">

          <div className="text-center">
            <h1 className="text-4xl text-primary-white">Welcome !</h1>
            <p className="mt-2 text-secondary-white">Create an Account and Start using ShieldPass</p>
          </div>

          <SignUpForm />
        </div>
      </div>
    </section>
  )
}

export default SignUpPage