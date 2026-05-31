import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET() {
  try {
    const docRef = doc(db, "website", "content");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json({ success: true, data: docSnap.data() });
    } else {
      return NextResponse.json({ success: true, data: {} });
    }
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
