import { LoginForm } from "@/components/AuthForm"
import Image from "next/image"
import BgBlob from "@/assets/bg-blob.svg"

const LoginPage = () => {
  return (

    <section className="h-screen w-full">

      <div className="absolute left-0 top-0 h-full w-full">
        <figure className="relative h-full w-full -z-10">
          <Image src={BgBlob} alt="" fill />
        </figure>
      </div>
      <div className="w-1/2 ml-auto h-full relative text-white">
        <div style={{
          background: "rgba(40, 40, 45, 0.21)"
        }} className="absolute w-full h-full absolute top-0 left-0 backdrop-blur-2xl"></div>
        <div className="relative z-10 flex flex-col justify-center h-full space-y-12 pl-10">
          <h1 className="text-4xl">LOGIN</h1>

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
