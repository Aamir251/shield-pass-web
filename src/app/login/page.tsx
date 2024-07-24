import Image from "next/image"
import LoginImage from "@/assets/login-image.jpg";
import LoginForm from "./login-form";


const LoginPage = () => {
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
            <h1 className="text-4xl text-primary-white">Welcome Back</h1>
            <p className="mt-2 text-secondary-white">Please enter your email and password to Login</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </section>
  )
}

export default LoginPage


// /* Rectangle 12 */

// position: absolute;
// width: 769px;
// height: 982px;
// left: 756px;
// top: 0px;

// background: rgba(40, 40, 45, 0.21);
// backdrop-filter: blur(70px);
/* Note: backdrop-filter has minimal browser support */
