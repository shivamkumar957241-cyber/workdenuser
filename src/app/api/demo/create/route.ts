import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobile, email, city, qualification } = body;

    if (!name || !mobile || !email || !city || !qualification) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const userDocRef = doc(db, "demo_users", cleanEmail);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      return NextResponse.json({ success: false, message: "A Demo Account already exists with this Gmail. Please Log In instead." }, { status: 400 });
    }

    const userData = {
      name: name.trim(),
      mobile: mobile.trim(),
      email: cleanEmail,
      city: city.trim(),
      qualification: qualification.trim(),
      createdAt: new Date().toISOString()
    };

    await setDoc(userDocRef, userData);

    return NextResponse.json({
      success: true,
      message: "Demo account created successfully!",
      userId: cleanEmail,
      password: mobile.trim()
    });
  } catch (error: any) {
    console.error("Error creating demo user:", error);
    return NextResponse.json({ success: false, message: error.message || "Server Error" }, { status: 500 });
  }
}
