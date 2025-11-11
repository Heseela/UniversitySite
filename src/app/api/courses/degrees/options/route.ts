import { db } from "@/db";
import { coursesTable } from "@/db/schema/courses";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const degrees = await db
      .select({
        label: coursesTable.degree,
        value: coursesTable.degree,
      })
      .from(coursesTable)
      .groupBy(coursesTable.degree);

    return NextResponse.json({
      data: degrees,
      total: degrees.length,
    });
  } catch (error) {
    console.error('Error fetching degrees:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}