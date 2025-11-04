import { db } from "@/db";
import { categories } from "@/db/schema/category";
import { events } from "@/db/schema/event";
import { and, asc, desc, eq, ilike, inArray, SQL } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { EOrder } from "../../../../types/global.types";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const q = searchParams.get("q");
    const category = searchParams.get("category");
    const slugs = searchParams.get("slugs")?.split(",") || [];
    const order = searchParams.get("order") || EOrder.Desc;

    const filters: SQL[] = [];
    if (q) filters.push(ilike(categories.name, `%${q}%`));
    if (category) filters.push(eq(categories.name, category));
    if (slugs.length > 0) filters.push(inArray(events.slug, slugs));

    const foundEvents = await db
        .select({
            id: events.id,
            title: events.title,
            slug: events.slug,
            eventDate: events.eventDate,
            venue: events.venue,
            capacity: events.capacity,
            coverImage: events.coverImage,
            summary: events.summary,
            categoryName: categories.name,
            updatedAt: events.updatedAt
        })
        .from(events)
        .leftJoin(categories, eq(events.categoryId, categories.id))
        .where(and(...filters))
        .orderBy(
            order === EOrder.Asc ? asc(events.eventDate) : desc(events.eventDate)
        );

    return NextResponse.json(foundEvents);
}
