import { authenticateUser, signJWTToken } from '@/lib/services/auth';
import { NextRequest, NextResponse } from 'next/server';
import { sign } from "jsonwebtoken"
import { cookies } from "next/headers"


export async function POST(req: NextRequest) {
  const { email, password } = await req.json();


  console.log({ email, password });

  try {
    const result = await authenticateUser(email, password)


    if (!result?.name || !result.email) throw Error("User Not FOund")

    if (result) {
      // Return the session token

      const token = signJWTToken(result.email!, result.name!)

      cookies().set('sp-auth-token', token)

      return NextResponse.json({ success: true, token });

    }


  } catch (error) {

    console.log({ error })
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}