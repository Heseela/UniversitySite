import { db } from "@/db";
import { categories } from "@/db/schema/category";
import { events } from "@/db/schema/event";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const [event] = await db
    .select({
      id: events.id,
      title: events.title,
      slug: events.slug,
      summary: events.summary,
      content: events.content,
      capacity: events.capacity,
      categoryId: events.categoryId,
      coverImage: events.coverImage,
      venue: events.venue,
      eventDate: events.eventDate,
      categoryName: categories.name,
    })
    .from(events)
    .where(and(eq(events.slug, slug)))
    .leftJoin(categories, eq(events.categoryId, categories.id))
    .limit(1);

  return NextResponse.json(event ?? null);
}
