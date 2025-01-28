import { authenticateUser } from "@/lib/services/auth";
import { getSharedCredentialsUseCase } from "@/use-cases/credential/credential.share";
import jwt from "jsonwebtoken"

export async function POST(req: Request) {


  try {
    const data = await req.json()

    const { email, password } = data

    if (!email || !password) throw new Error("Email / Password is missing")

    const user = await authenticateUser(email, password)

    if (!user) throw new Error("Invalid Email or Password")


    // if (!tokenValue) throw new Error("UnAuthorized")

    // const token = jwt.verify(tokenValue, process.env.NEXTAUTH_SECRET as string) as {
    //   email: string,
    //   iat: number
    // }

    const { credentials, sharedPrivateKey } = await getSharedCredentialsUseCase(email as string)

    return Response.json({
      success: true,
      credentials,
      sharedPrivateKey
    }, { status: 200 })

  } catch (error: any) {
    return Response.json({ success: false, error: error.message }, { status: 404 })
  }

}