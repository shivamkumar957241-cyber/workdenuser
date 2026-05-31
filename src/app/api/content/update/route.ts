import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { type, data } = await request.json();

    if (type === "content") {
      await setDoc(doc(db, "website", "content"), data, { merge: true });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
