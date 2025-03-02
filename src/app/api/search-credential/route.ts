import { checkIfSessionExists } from "@/lib/services/auth";
import { searchCredentialUseCase } from "@/use-cases/credential";
import { NextRequest } from "next/server";

const handler = async (req: NextRequest) => {

  
  try {
    const session = await checkIfSessionExists();
    
    const body = await req.json();
    
    const resp = await searchCredentialUseCase(session.email!, body.searchString)

    
    return Response.json({ success: true, credentials: resp });

  } catch (error : any ) {
    console.log({ error });

    return Response.json({ success: false, message: error.message });
  }


}

export { handler as POST }