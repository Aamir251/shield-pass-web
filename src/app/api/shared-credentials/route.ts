import { getSharedCredentialsUseCase } from "@/use-cases/credential/credential.share";

export async function POST(req: Request) {


  try {
    const data = await req.json()

    const { email } = data
    
    console.log({ email });
    
    if (!email) throw new Error("Email is missing")

    // const user = await authenticateUser(email, password)

    // if (!user) throw new Error("Invalid Email or Password")


    // if (!tokenValue) throw new Error("UnAuthorized")

    // const token = jwt.verify(tokenValue, process.env.NEXTAUTH_SECRET as string) as {
    //   email: string,
    //   iat: number
    // }

    const { credentials } = await getSharedCredentialsUseCase(email as string)

    return Response.json({
      success: true,
      credentials,
    }, { status: 200 })

  } catch (error: any) {

    console.log({ error });
    
    return Response.json({ success: false, error: error.message }, { status: 404 })
  }

}