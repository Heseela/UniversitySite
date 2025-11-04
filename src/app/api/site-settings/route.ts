import { db } from "@/db";
import { siteSetting } from "@/db/schema/site-setting";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const [siteData] = await db.select().from(siteSetting).limit(1);

    return NextResponse.json(siteData);

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch site settings" },
      { status: 500 }
    );
  }
}
