import { db } from "@/db";
import { blogs } from "@/db/schema/blog";
import { getPaginationQueryParams, paginatedResponse } from "@/lib/db-utils";
import { and, desc, ilike, isNull, not, SQL } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const q = searchParams.get("q");
    const { page, pageSize } = getPaginationQueryParams(searchParams);

    const filters: SQL[] = [];
    if (q) filters.push(ilike(blogs.title, `%${q}%`));

    const query = db
        .select({
            label: blogs.title,
            value: blogs.slug,
        })
        .from(blogs)
        .where(and(...filters, not(isNull(blogs.publishedAt)))); // ensure blogs are published

    const foundBlogs = await paginatedResponse({
        orderByColumn: desc(blogs.publishedAt),
        qb: query.$dynamic(),
        page,
        pageSize
    })

    return NextResponse.json(foundBlogs);
}