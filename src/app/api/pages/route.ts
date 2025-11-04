import { db } from "@/db";
import { pages } from "@/db/schema/page";
import { NextResponse } from "next/server";

export async function GET() {
    const foundPages = await db
        .select({
            id: pages.id,
            name: pages.name,
            slug: pages.slug,
            metadata: pages.metadata,
            updatedAt: pages.updatedAt
        })
        .from(pages);

    return NextResponse.json(foundPages);
}