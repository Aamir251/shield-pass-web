import { verifyJWTToken } from "@/lib/services/auth";
import { getSharedCredentialsUseCase } from "@/use-cases/credential/credential.share";
import { User } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {


  try {
    const isTokenValid = verifyJWTToken(request) as Pick<User, "email" | "name">

    if (!isTokenValid) throw new Error("Invalid Token");

    const credentials = await getSharedCredentialsUseCase(isTokenValid.email as string)

    return Response.json({ credentials }, { status: 200 })


  } catch (error: any) {
    return Response.json({ success: false, error: error.message }, { status: 404 })

  }


}