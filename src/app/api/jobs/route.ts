import { db } from "@/db";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { jobsTable } from "@/db/schema/jobs";

export async function GET() {
    const foundJobs = await db
        .select({
            id: jobsTable.id,
            title: jobsTable.title,
            slug: jobsTable.slug,
            status: jobsTable.status,
            type: jobsTable.type,
            department: jobsTable.department,
            updatedAt: jobsTable.updatedAt,
            createdAt: jobsTable.createdAt,
        })
        .from(jobsTable)
        .orderBy(desc(jobsTable.updatedAt));

    return NextResponse.json(foundJobs);
}
