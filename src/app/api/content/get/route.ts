import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const docRef = doc(db, "website", "content");
    const docSnap = await getDoc(docRef);

    const headers = {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      "Pragma": "no-cache",
      "Expires": "0"
    };

    if (docSnap.exists()) {
      return NextResponse.json({ success: true, data: docSnap.data() }, { headers });
    } else {
      return NextResponse.json({ success: true, data: {} }, { headers });
    }
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
