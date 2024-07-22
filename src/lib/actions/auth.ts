"use server"

import { dbClient } from "@/lib/db/client"
import { signIn } from "next-auth/react"
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

type FormState = {
  message: string;
}

export const login = async (prevState: any, formData: FormData) => {


  try {
    const email = formData.get('email')

    const password = formData.get("password")

    console.log({ email, password});
    

    if (!email) throw new Error("Please Enter Email")
    if (!password) throw new Error("Please Enter Password")

    /**
     * Not comparing passwords here, as gets compared in the authorize callback
     * of NextAuth Options
     */

    await signIn("credentials", { email, password })
  } catch (error: any) {
    return {
      error : error.message
    }
  }


}



export const signUp = async (prevState: any, formData: FormData) => {


  try {
    const username = formData.get('username') as string
    const email = formData.get('email') as string

    const password = formData.get("password") as string

    if (!username) throw new Error("Please Enter Name")
    if (!email) throw new Error("Please Enter Email")
    if (!password) throw new Error("Please Enter Password")

    // check if user already exists
    const userExists = await dbClient.user.findUnique({ where: { email } })

    if (userExists) throw new Error("User Already Exists");

    // create account
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS)

    const createdUser = await dbClient.user.create({
      data: {
        email,
        password: hashedPassword,
        name: username
      }
    }
    )

    console.log({ createdUser });

    await signIn("credentials", { email, password })
  } catch (error : any) {
    return {
      error : error.message
    }
  }


}