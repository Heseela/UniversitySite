import { db } from "@/db";
import { forms } from "@/db/schema/form";
import { getPaginationQueryParams, paginatedResponse } from "@/lib/db-utils";
import { and, desc, ilike, SQL } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const q = searchParams.get("q");
    const { page, pageSize } = getPaginationQueryParams(searchParams);

    const filters: SQL[] = [];
    if (q) filters.push(ilike(forms.title, `%${q}%`));

    const query = db
        .select({
            label: forms.title,
            value: forms.id,
        })
        .from(forms)
        .where(and(...filters));

    const foundForms = await paginatedResponse({
        orderByColumn: desc(forms.createdAt),
        qb: query.$dynamic(),
        page,
        pageSize
    })

    return NextResponse.json(foundForms);
}