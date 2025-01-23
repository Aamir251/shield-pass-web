import { getSharedCredentialsUseCase } from "@/use-cases/credential/credential.share";
import { User } from "@prisma/client";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {


  try {

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET as string })


    if (!token) throw new Error("unauthorized")
    const { credentials, sharedPrivateKey } = await getSharedCredentialsUseCase(token.email as string)

    console.log({ credentials })
    return Response.json({ success : true, credentials, sharedPrivateKey }, { status: 200 })




  } catch (error: any) {
    return Response.json({ success: false, error: error.message }, { status: 404 })

  }


}