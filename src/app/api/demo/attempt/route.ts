import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, taskName, taskCategory, totalEntries, correctEntries, wrongEntries, accuracy, status, reportData } = body;

    if (!email || !taskName || !taskCategory || totalEntries === undefined || correctEntries === undefined || wrongEntries === undefined || accuracy === undefined || !status) {
      return NextResponse.json({ success: false, message: "Missing attempt details" }, { status: 400 });
    }

    const attemptData = {
      userId: email.trim().toLowerCase(),
      taskName,
      taskCategory,
      totalEntries: parseInt(totalEntries, 10),
      correctEntries: parseInt(correctEntries, 10),
      wrongEntries: parseInt(wrongEntries, 10),
      accuracy: parseFloat(accuracy),
      status,
      timestamp: new Date().toISOString(),
      reportData: reportData || null
    };

    const attemptsRef = collection(db, "demo_attempts");
    const docRef = await addDoc(attemptsRef, attemptData);

    return NextResponse.json({
      success: true,
      message: "Attempt saved successfully!",
      attemptId: docRef.id
    });
  } catch (error: any) {
    console.error("Error saving demo attempt:", error);
    return NextResponse.json({ success: false, message: error.message || "Server Error" }, { status: 500 });
  }
}
