import { db } from "@/db";
import { coursesTable } from "@/db/schema/courses";
import { getPaginationQueryParams, paginatedResponse } from "@/lib/db-utils";
import { and, asc, ilike, SQL } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const q = searchParams.get("q");
  const { page, pageSize } = getPaginationQueryParams(searchParams);

  const filters: SQL[] = [];
  if (q) filters.push(ilike(coursesTable.name, `%${q}%`));

  const query = db
    .select({
      label: coursesTable.name,
      value: coursesTable.slug,
    })
    .from(coursesTable)
    .where(and(...filters));

  const foundCourses = await paginatedResponse({
    orderByColumn: asc(coursesTable.name),
    qb: query.$dynamic(),
    page,
    pageSize,
  });

  return NextResponse.json(foundCourses);
}
