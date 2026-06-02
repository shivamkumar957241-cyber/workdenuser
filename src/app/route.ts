import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "index.html");
    const htmlContent = fs.readFileSync(filePath, "utf8");

    return new NextResponse(htmlContent, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (err) {
    console.error("Failed to read static index.html:", err);
    return new NextResponse("Error loading home page", { status: 500 });
  }
}
