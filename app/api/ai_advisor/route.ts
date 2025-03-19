import { demoData } from "@/utils/demoData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const isDemoMode =
    req.headers.get("x-demo-mode") === "true" ||
    new URL(req.url).searchParams.get("demo") === "true";

  if (isDemoMode) {
    return NextResponse.json({
      advice: demoData.insights,
    });
  }

  return NextResponse.json({ message: "Real data from api will appear here" });
}
