import { db } from "@/db";
import { coursesTable } from "@/db/schema/courses";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const faculties = await db
      .select({
        label: coursesTable.faculty,
        value: coursesTable.faculty,
      })
      .from(coursesTable)
      .groupBy(coursesTable.faculty);

    return NextResponse.json({
      data: faculties,
      total: faculties.length,
    });
  } catch (error) {
    console.error('Error fetching faculties:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}