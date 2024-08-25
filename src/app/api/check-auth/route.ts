import { NextRequest } from "next/server";
import { verifyJWTToken } from "@/lib/services/auth";

export async function GET(request: NextRequest) {

  try {
    // Verify Token
    const isTokenValid = verifyJWTToken(request)

    if (!isTokenValid) throw new Error("Invalid Token")

    if (isTokenValid)
      return Response.json({ message: "authorized" }, { status: 200 })

  } catch (error: any) {
    return Response.json({ authorized: error.message }, { status: 404 })

  }
}