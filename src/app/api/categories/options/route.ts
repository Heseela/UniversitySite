import { db } from "@/db";
import { categories, CategoryType } from "@/db/schema/category";
import { getPaginationQueryParams, paginatedResponse } from "@/lib/db-utils";
import { and, asc, eq, ilike, SQL } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const q = searchParams.get("q");
  const type =
    searchParams.get("type") === CategoryType.BLOG
      ? CategoryType.BLOG
      : CategoryType.EVENT;
  const { page, pageSize } = getPaginationQueryParams(searchParams);

  const filters: SQL[] = [];
  if (q) filters.push(ilike(categories.name, `%${q}%`));
  filters.push(eq(categories.type, type));

  const query = db
    .select({
      label: categories.name,
      value: categories.id,
    })
    .from(categories)
    .where(and(...filters));

  const foundCategories = await paginatedResponse({
    orderByColumn: asc(categories.name),
    qb: query.$dynamic(),
    page,
    pageSize,
  });

  return NextResponse.json(foundCategories);
}
