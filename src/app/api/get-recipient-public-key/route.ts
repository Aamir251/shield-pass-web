import { getRecipientPublicKey } from "@/data/user";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {

  try {
    const email = req?.nextUrl.searchParams.get("email");

    console.log({ email })

    if (!email) throw new Error("Email not provided")
    
    const data = await getRecipientPublicKey(email)


    if (!data) throw new Error("User does not Exist")

    return Response.json({ success : true, recipientPublicKey : data?.publicKey  }, { status: 200 })
  } catch (error : any) {

    return Response.json({ success : false, message : error.message }, { status: 404 })

  }

}