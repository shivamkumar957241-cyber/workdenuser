import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Props = {
  params: Promise<{ filename: string }>;
};

export async function GET(request: Request, props: Props) {
  const params = await props.params;
  const filename = params.filename;
  
  console.log(`[WorkDen Router] Received request for filename: "${filename}"`);

  // Support both with and without .html extension (handles Next.js extension stripping)
  let targetFile = filename;
  if (!targetFile.endsWith(".html")) {
    targetFile = targetFile + ".html";
  }

  try {
    const filePath = path.join(process.cwd(), "public", targetFile);
    console.log(`[WorkDen Router] Checking file path: "${filePath}"`);
    
    if (fs.existsSync(filePath)) {
      const htmlContent = fs.readFileSync(filePath, "utf8");
      return new NextResponse(htmlContent, {
        headers: {
          "Content-Type": "text/html",
        },
      });
    }

    console.log(`[WorkDen Router] File not found: "${filePath}". Serving 404.`);
    return new NextResponse("Not Found", { status: 404 });
  } catch (err) {
    console.error(`Failed to read static file ${targetFile}:`, err);
    return new NextResponse("Error loading page", { status: 500 });
  }
}
