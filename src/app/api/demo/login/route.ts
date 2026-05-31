import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, mobile } = body;

    if (!email || !mobile) {
      return NextResponse.json({ success: false, message: "Gmail and Mobile Number are required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanMobile = mobile.trim();

    const userDocRef = doc(db, "demo_users", cleanEmail);
    const userSnap = await getDoc(userDocRef);

    if (!userSnap.exists()) {
      return NextResponse.json({ success: false, message: "No Demo Account found with this Gmail. Please Create Account first." }, { status: 404 });
    }

    const userData = userSnap.data();
    if (userData.mobile !== cleanMobile) {
      return NextResponse.json({ success: false, message: "Invalid Password (Mobile Number)." }, { status: 401 });
    }

    // Fetch attempt history from collection
    const attemptsRef = collection(db, "demo_attempts");
    const q = query(attemptsRef, where("userId", "==", cleanEmail));
    const querySnapshot = await getDocs(q);
    const history: any[] = [];
    querySnapshot.forEach((doc) => {
      history.push({ id: doc.id, ...doc.data() });
    });

    // Sort by timestamp descending
    history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json({
      success: true,
      user: {
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile,
        city: userData.city,
        qualification: userData.qualification
      },
      history
    });
  } catch (error: any) {
    console.error("Error in demo login:", error);
    return NextResponse.json({ success: false, message: error.message || "Server Error" }, { status: 500 });
  }
}
