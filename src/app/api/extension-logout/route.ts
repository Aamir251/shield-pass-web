import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    
    cookies().delete("sp-auth-token")

    return NextResponse.json({ success : true, message : "Logout Successful"})

  } catch (error : any) {
    
    console.log({ error })
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}