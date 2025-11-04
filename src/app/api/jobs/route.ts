import { db } from "@/db";
import { asc, desc, eq, ilike, inArray, SQL } from "drizzle-orm";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { EOrder } from "../../../../types/global.types";
import { jobsTable } from "@/db/schema/jobs";
import { EJobStatus, EJobType } from "@/schemas/job.schema";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const q = searchParams.get("q");
    const limit = searchParams.get("limit");
    const slugs = searchParams.get("slugs")?.split(",") || [];
    const order = searchParams.get("order") || EOrder.Desc;
    const department = searchParams.get("department");
    const status = searchParams.get("status");
    const type = searchParams.get("type");

    const filters: SQL[] = [];

    if (q) filters.push(ilike(jobsTable.title, `%${q}%`));
    if (slugs.length) filters.push(inArray(jobsTable.slug, slugs));
    if (department) filters.push(eq(jobsTable.department, department));
    if (status) filters.push(eq(jobsTable.status, status as EJobStatus));
    if (type) filters.push(eq(jobsTable.type, type as EJobType));

    const foundJobs = await db
        .select({
            id: jobsTable.id,
            title: jobsTable.title,
            slug: jobsTable.slug,
            status: jobsTable.status,
            type: jobsTable.type,
            department: jobsTable.department,
            updatedAt: jobsTable.updatedAt,
        })
        .from(jobsTable)
        .orderBy(
            order === EOrder.Asc ? asc(jobsTable.createdAt) : desc(jobsTable.createdAt)
        )
        .limit(Number(limit) || 100); // TODO: this should not be hardcoded

    return NextResponse.json(foundJobs);
}
