import { getSearchResults } from "@/data/credential";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {

  try {
    const url = new URL(req.url)

    const searchTerm = url.searchParams.get("searchTerm") as string

    if (!searchTerm) throw Error("Search Term Not Found")

    const credentialsFound = await getSearchResults("669fc2fd5e9d412ce89567c7", searchTerm)

    console.log({ credentialsFound });
    

    return Response.json({ message: "hello Search " }, { status: 200 })


  } catch (error : any) {

    return Response.json({ message: error.message }, { status: 200 })
  }
}