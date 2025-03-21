import { authenticateUser } from "@/lib/services/auth";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

import { cookies } from "next/headers";
import { EncryptedKey } from "@prisma/client";

export async function POST(req : Request) {

  try {
    
    const cookieStore = cookies()

    const data = await req.json()

    const { email, password } = data

    if (!email || !password) throw new Error("Email / Password is missing")
    
    const user = await authenticateUser(email, password) as unknown as {
      email : string,
      sharedPrivateKey : EncryptedKey
    }

    
    if (!user?.email) throw new Error("Invalid Email or Password")

    
    // const token =  jwt.sign({ email }, process.env.NEXTAUTH_SECRET as string, {
    //   expiresIn : 3600,
    // })

    
    // return Response.json({ success : true, token }, { status : 200 })
    return Response.json({ success : true, privateKey : user.sharedPrivateKey }, { status : 200 })

  } catch (err : any) {

    let error;

    if (err.message === "Unexpected end of JSON input") {
      error = "Body Is Empty"
    } else {
      error = err.message
    }

    console.log("ERROR ", error)
    return Response.json({ success: false, error: error }, { status: 404 })

  }
}
