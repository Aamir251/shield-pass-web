"use server";

import { signIn } from "next-auth/react";

export const loginAction = async (email : string, password : string) => {
  
  return await signIn("credentials", { email, password, redirect : false })

}