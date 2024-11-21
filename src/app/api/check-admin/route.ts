import { adminAuth, adminDb } from "@/firebase/firebaseAdmin";
import { NextResponse } from "next/server";

const credentialsRef = adminDb.collection("site_info").doc("credentials");

export async function POST(req: Request) {
  const { uid } = await req.json();

  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      throw new Error("Unauthorized: No token provided");
    }

    const decodedToken = await adminAuth.verifyIdToken(token);
    if (!decodedToken) {
      throw new Error("Unauthorized: Invalid token");
    }

    const doc = await credentialsRef.get();
    const admin_uids = (doc.get("admin_uids") as string[]) || [];

    if (admin_uids.includes(uid)) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
