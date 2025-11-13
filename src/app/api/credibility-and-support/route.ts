import { db } from "@/db";
import { credibilityAndSupportTable } from "@/db/schema/credibility-and-support";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const col = searchParams.get("col");

    // Define valid columns based on your schema
    const validColumns = [
      'faqCategories',
      'faqs',
      'partners',
      'testimonials',
      'certifications',
      'alumni'
    ];

    // If no column specified, return all data
    if (!col) {
      const [data] = await db.select().from(credibilityAndSupportTable);
      return NextResponse.json(data || {});
    }

    // Handle multiple columns separated by commas
    const requestedColumns = col.split(',').map(c => c.trim());

    // Validate each requested column
    const invalidColumns = requestedColumns.filter(
      column => !validColumns.includes(column)
    );

    if (invalidColumns.length > 0) {
      return NextResponse.json(
        {
          error: "Invalid columns provided",
          invalidColumns,
          validColumns
        },
        { status: 400 }
      );
    }

    // Fetch all data first, then filter in JavaScript
    const [data] = await db.select().from(credibilityAndSupportTable);

    if (!data) {
      return NextResponse.json({});
    }

    // If single column requested, return just that column
    if (requestedColumns.length === 1) {
      const singleColumn = requestedColumns[0];
      return NextResponse.json({
        [singleColumn]: data[singleColumn as keyof typeof data]
      });
    }

    // If multiple columns requested, return an object with those columns
    const responseData: any = {};
    requestedColumns.forEach(column => {
      if (column in data) {
        responseData[column] = data[column as keyof typeof data];
      }
    });

    return NextResponse.json(responseData);

  } catch (error) {
    console.error("Error in credibility-and-support API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};