import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res : NextApiResponse) {

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET as string })

  if (token) {
    return Response.json({ token, message : "authorized" }, { status : 200 })

  }

  return Response.json({  message : "unauthorized" }, { status : 404 })

}