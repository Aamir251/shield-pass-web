import { getSearchResults } from "@/data/credential";
import { capitalizeFirstLetter } from "@/lib/helpers/utils";
import { CredentialsType } from "@/types/credentials";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {

  try {
    const url = new URL(req.url)

    const searchTerm = url.searchParams.get("searchTerm") as string

    if (!searchTerm) throw Error("Search Term Not Found")
    
    let credentialsType = url.searchParams.get("credentialType") as CredentialsType
    
    credentialsType = capitalizeFirstLetter(credentialsType) as CredentialsType
    const credentials = await getSearchResults("669fc2fd5e9d412ce89567c7", searchTerm, credentialsType)


    return Response.json({ credentials }, { status: 200 })


  } catch (error : any) {

    return Response.json({ message: error.message }, { status: 200 })
  }
}