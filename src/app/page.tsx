import HeroImage from "@/assets/hero.jpg";
import Image from "next/image";
import { Genos } from "next/font/google";
import Link from "next/link";
import { Metadata } from "next";


const genos = Genos({ subsets : ["latin"]})

export default function HomePage() {


  return <>
    <main className="bg-black h-screen flex justify-center items-center">
      <figure className="h-[80vh] w-full absolute inset-0">
        <Image
          src={HeroImage}
          alt="background image" layout="fill" objectFit="cover"
          objectPosition="0% 90%"
        />
      </figure>
      <article className="relative z-10 text-center">
        <span style={{ 
          background: "linear-gradient(90deg, rgba(150, 150, 150, 0.6) 0%, rgba(67, 67, 67, 0.33) 100%)"
          }} 
        className="block w-max mx-auto px-6 py-1.5 rounded-full text-sm translate-y-2"
        >
          Credential Sharing Made Easy
        </span>
        <h1  className={`text-9xl text-white ${genos.className}`}>Shield Pass</h1>
        <p className="text-lg mt-2 max-w-md mx-auto text-secondary-white">
          Easily manage and share sensitive credentials with complete peace of mind. Simple, safe, and fast.
        </p>

        <Link className="mt-6 block bg-white text-black w-max mx-auto px-12 py-2.5 text-lg font-semibold rounded-md" href={"/login"}>Get Started</Link>
      </article>
    </main>
  </>
}



export const metadata : Metadata = {
  title : "Shield Pass | Credential sharing made easy"
}
