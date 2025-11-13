import { db } from "@/db";
import { events } from "@/db/schema/event";
import { getPaginationQueryParams, paginatedResponse } from "@/lib/db-utils";
import { and, desc, ilike, SQL } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const q = searchParams.get("q");
  const { page, pageSize } = getPaginationQueryParams(searchParams);

  const filters: SQL[] = [];
  if (q) filters.push(ilike(events.title, `%${q}%`));

  const query = db
    .select({
      label: events.title,
      value: events.slug,
    })
    .from(events)
    .where(and(...filters));

  const foundEvents = await paginatedResponse({
    orderByColumn: desc(events.eventDate),
    qb: query.$dynamic(),
    page,
    pageSize,
  });

  return NextResponse.json(foundEvents);
}
