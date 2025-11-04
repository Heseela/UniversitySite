import { db } from "@/db";
import { teamTable } from "@/db/schema/team";
import { getPaginationQueryParams, paginatedResponse } from "@/lib/db-utils";
import { and, desc, ilike, SQL } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const q = searchParams.get("q");
    const { page, pageSize } = getPaginationQueryParams(searchParams);

    const filters: SQL[] = [];
    if (q) filters.push(ilike(teamTable.name, `%${q}%`));

    const query = db
        .select({
            label: teamTable.name,
            value: teamTable.id,
        })
        .from(teamTable)
        .where(and(...filters));

    const foundTeams = await paginatedResponse({
        orderByColumn: desc(teamTable.createdAt),
        qb: query.$dynamic(),
        page,
        pageSize
    })

    return NextResponse.json(foundTeams);
}