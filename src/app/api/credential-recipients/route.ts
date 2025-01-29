import { checkIfSessionExists } from "@/lib/services/auth";
import { getMyCredentialRecipientsUseCase } from "@/use-cases/credential/credential.share";
import { NextRequest } from "next/server";


export const dynamic = "force-dynamic"


const handler = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    const credentialId = searchParams.get("credentialId");

    if (!credentialId) throw new Error("No Credential Found");

    const session = await checkIfSessionExists();

    const response = await getMyCredentialRecipientsUseCase(
      credentialId,
      session.email!
    );

    return Response.json({ success: true, recipients: response });
  } catch (error: any) {
    console.log({ error });

    return Response.json({ success: false, message: error.message });
  }
};

export { handler as GET };
