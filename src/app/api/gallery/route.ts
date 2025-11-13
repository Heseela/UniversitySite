import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const category = searchParams.get("category"); // must be categories.id NOT name

    const galleries = await db.query.galleriesTable.findMany({
        where: (galleriesTable, { eq }) => {
            return category ? eq(galleriesTable.categoryId, category) : undefined;
        },
        with: {
            media: true,
            category: {
                columns: {
                    name: true
                }
            }
        }
    });

    return NextResponse.json(galleries);
}
