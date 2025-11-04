import { db } from "@/db";
import { pages } from "@/db/schema/page";
import { getPaginationQueryParams, paginatedResponse } from "@/lib/db-utils";
import { and, desc, ilike, SQL } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const q = searchParams.get("q");
    const { page, pageSize } = getPaginationQueryParams(searchParams);
    
    const filters: SQL[] = [];
    if (q) filters.push(ilike(pages.name, `%${q}%`));

    const query = db
        .select({
            label: pages.name,
            value: pages.slug,
        })
        .from(pages)
        .where(and(...filters));

    const foundPages = await paginatedResponse({
        orderByColumn: desc(pages.createdAt),
        qb: query.$dynamic(),
        page,
        pageSize
    })

    return NextResponse.json(foundPages);
}