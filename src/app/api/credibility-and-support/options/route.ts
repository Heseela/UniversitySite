import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { credibilityAndSupportTable } from "@/db/schema/credibility-and-support";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const column = searchParams.get("col");
    const q = searchParams.get("q") || "";

    const validOptionColumns = ['faqCategories'];

    if (!column || !validOptionColumns.includes(column)) {
      return NextResponse.json(
        { 
          error: "Please provide valid column",
          validColumns: validOptionColumns 
        },
        { status: 400 }
      );
    }

    const [data] = await db.select().from(credibilityAndSupportTable);

    if (!data || !data[column as keyof typeof data]) {
      return NextResponse.json({ data: [] });
    }

    const columnData = data[column as keyof typeof data] as any[];

    let options: Array<{ label: string; value: string }> = [];

    switch (column) {
      case 'faqCategories':
        options = columnData
          .filter(item => item && item.name)
          .map(item => ({
            label: formatCategoryName(item.name),
            value: item.name,
          }));
        break;

      default:
        options = [];
    }

    // Filter by search query if provided
    const filteredOptions = q 
      ? options.filter(option => 
          option.label.toLowerCase().includes(q.toLowerCase())
        )
      : options;

    return NextResponse.json({
      data: filteredOptions,
      total: filteredOptions.length,
    });

  } catch (error) {
    console.error("Error fetching options:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to format category names
function formatCategoryName(category: string): string {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}